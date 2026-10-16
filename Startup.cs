using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Runtime.Loader;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Jellyfin.Database.Implementations.Entities;
using MediaBrowser.Common.Configuration;
using MediaBrowser.Common.Net;
using MediaBrowser.Controller;
using MediaBrowser.Controller.Configuration;
using MediaBrowser.Model.Activity;
using MediaBrowser.Model.Branding;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace JellyfinThemeBuilder
{
    // What the server knows about adding the script to the web client, for the plugin page, the editor's
    // Diagnostics and GET /ThemeBuilder/status. Jellyfin keeps only a few days of logs, so a failure at startup
    // used to leave no trace once the log rotated.
    public static class InjectionStatus
    {
        private static readonly object Gate = new();

        // starting, retrying, registered, failed (gave up) or unavailable (File Transformation missing/incompatible).
        public static string State { get; private set; } = "starting";
        public static string? Error { get; private set; }
        public static int Attempts { get; private set; }
        public static int Copies { get; private set; }
        public static int CopiesRegistered { get; private set; }
        public static DateTime? RegisteredAt { get; private set; }
        public static DateTime? LastCheckAt { get; private set; }
        // Whether the server's own /web/index.html had the script at the last check (null: not checked yet / failed).
        public static bool? LastCheckInjected { get; private set; }
        public static string? LastCheckError { get; private set; }
        public static int Repairs { get; private set; }

        public static void Attempt(int attempt, int copies, int registered, Exception? error)
        {
            lock (Gate)
            {
                Attempts = attempt;
                Copies = copies;
                CopiesRegistered = registered;
                if (error != null) Error = error.GetBaseException().Message;
                if (registered > 0)
                {
                    State = "registered";
                    RegisteredAt ??= DateTime.UtcNow;
                }
                else if (State != "unavailable")
                {
                    State = "retrying";
                }
            }
        }

        public static void Set(string state, string? error = null)
        {
            lock (Gate)
            {
                State = state;
                if (error != null) Error = error;
            }
        }

        public static void Checked(bool? injected, string? error)
        {
            lock (Gate)
            {
                LastCheckAt = DateTime.UtcNow;
                LastCheckInjected = injected;
                LastCheckError = error;
            }
        }

        public static void Repaired()
        {
            lock (Gate) Repairs++;
        }

        public static object Snapshot()
        {
            lock (Gate)
            {
                return new
                {
                    state = State,
                    error = Error,
                    attempts = Attempts,
                    copies = Copies,
                    copiesRegistered = CopiesRegistered,
                    registeredAt = RegisteredAt,
                    lastCheckAt = LastCheckAt,
                    lastCheckInjected = LastCheckInjected,
                    lastCheckError = LastCheckError,
                    repairs = Repairs
                };
            }
        }
    }

    public class ThemeBuilderStartup : IHostedService, IDisposable
    {
        // How long to keep retrying the File Transformation registration at startup, and how often to check afterwards
        // that the page still has the script.
        private const int RegisterAttempts = 60;
        private static readonly TimeSpan RegisterRetryDelay = TimeSpan.FromSeconds(2);
        private static readonly TimeSpan CheckInterval = TimeSpan.FromMinutes(5);

        private readonly ILogger<ThemeBuilderStartup> _logger;
        private readonly IServerConfigurationManager _config;
        private readonly IServerApplicationHost _host;
        private readonly IActivityManager _activity;
        private readonly CancellationTokenSource _stopping = new();
        private readonly HttpClient _http = new() { Timeout = TimeSpan.FromSeconds(15) };

        // File Transformation copies already registered with.
        private readonly HashSet<Assembly> _registered = new();
        // One dashboard activity entry per problem, not one every check.
        private bool _reportedProblem;

        public ThemeBuilderStartup(ILogger<ThemeBuilderStartup> logger, IServerConfigurationManager config,
            IServerApplicationHost host, IActivityManager activity)
        {
            _logger = logger;
            _config = config;
            _host = host;
            _activity = activity;
        }

        private void RestoreBrandingCopy()
        {
            try
            {
                string? css = Plugin.Instance?.Configuration.GeneratedCss;
                var branding = _config.GetConfiguration<BrandingOptions>("branding");
                string? merged = BrandingSync.Merge(branding.CustomCss, css);
                if (merged == null) return;
                branding.CustomCss = merged;
                _config.SaveConfiguration("branding", branding);
                _logger.LogInformation("[ThemeBuilder] The theme's copy in Custom CSS (used by TV apps) was missing or out of date; restored it from the saved theme.");
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[ThemeBuilder] Could not check the theme's copy in Custom CSS.");
            }
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            RestoreBrandingCopy();

            _logger.LogInformation("[ThemeBuilder] Server booted. Registering global script with File Transformation.");
            // Not awaited: startup mustn't wait for the retries or the checks.
            _ = Task.Run(() => RunAsync(_stopping.Token));
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _stopping.Cancel();
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _stopping.Dispose();
            _http.Dispose();
        }

        private async Task RunAsync(CancellationToken token)
        {
            try
            {
                if (!await RegisterWithRetriesAsync(token).ConfigureAwait(false)) return;
                // From here on, check now and then that the page still carries the script, and register again if not
                // (File Transformation reloaded or updated without a restart, another plugin replacing the page…).
                while (!token.IsCancellationRequested)
                {
                    await CheckAndRepairAsync(token).ConfigureAwait(false);
                    await Task.Delay(CheckInterval, token).ConfigureAwait(false);
                }
            }
            catch (OperationCanceledException)
            {
                // Server shutting down.
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[ThemeBuilder] The script injection watcher stopped unexpectedly.");
            }
        }

        // File Transformation 3.x resolves its services from the provider it was created with. Jellyfin can load it more
        // than once during startup (15 copies on one server), and a copy whose provider is already disposed throws
        // ObjectDisposedException inside RegisterTransformation, so the script was never injected. Keep checking for the
        // whole window and register once with every copy that accepts, since the copy that serves pages may only appear
        // after an earlier one accepted. false: File Transformation can't be used at all.
        private async Task<bool> RegisterWithRetriesAsync(CancellationToken token)
        {
            Exception? lastError = null;
            for (int attempt = 1; attempt <= RegisterAttempts; attempt++)
            {
                bool? result = TryRegister(out Exception? error, out int copies);
                if (result == null)
                {
                    await ReportProblemAsync("File Transformation is missing, disabled or an incompatible version. Install or enable it and restart Jellyfin.").ConfigureAwait(false);
                    return false;
                }
                if (error != null) lastError = error;
                InjectionStatus.Attempt(attempt, copies, _registered.Count, error);
                if (attempt == 1 && _registered.Count == 0)
                {
                    _logger.LogInformation("[ThemeBuilder] File Transformation isn't ready yet ({Copies} loaded copies; {Reason}); retrying until it is.",
                        copies, error?.GetBaseException().Message);
                }
                await Task.Delay(RegisterRetryDelay, token).ConfigureAwait(false);
            }
            if (_registered.Count == 0)
            {
                InjectionStatus.Set("failed");
                _logger.LogError(lastError, "[ThemeBuilder] Could not register with File Transformation after {Attempts} attempts. " +
                    "The theme editor and script features won't load until Jellyfin is restarted.", RegisterAttempts);
                await ReportProblemAsync("File Transformation didn't accept the registration (" + (lastError?.GetBaseException().Message ?? "no reason given") +
                    "). Restart Jellyfin; if it keeps happening, check the startup log for [ThemeBuilder] lines.").ConfigureAwait(false);
            }
            // Keep watching even after a failure: a later repair attempt may still succeed.
            return true;
        }

        private async Task CheckAndRepairAsync(CancellationToken token)
        {
            bool? injected = await PageHasScriptAsync(token).ConfigureAwait(false);
            if (injected != false) return;

            _logger.LogWarning("[ThemeBuilder] The web client's index.html no longer has the theme script; registering with File Transformation again.");
            _registered.Clear();
            TryRegister(out Exception? error, out int copies);
            InjectionStatus.Attempt(InjectionStatus.Attempts + 1, copies, _registered.Count, error);
            InjectionStatus.Repaired();
            injected = await PageHasScriptAsync(token).ConfigureAwait(false);
            if (injected == true)
            {
                _logger.LogInformation("[ThemeBuilder] Script injection repaired.");
                _reportedProblem = false;
                return;
            }
            InjectionStatus.Set("failed");
            await ReportProblemAsync("The web client stopped carrying the theme script and registering again didn't bring it back" +
                (error != null ? " (" + error.GetBaseException().Message + ")" : "") + ". Restart Jellyfin.").ConfigureAwait(false);
        }

        // Fetches index.html from this server, the way browsers get it (through File Transformation). null when the
        // check itself couldn't run (no local HTTP port, request failed), which isn't treated as a missing script.
        private async Task<bool?> PageHasScriptAsync(CancellationToken token)
        {
            try
            {
                string baseUrl = (_config.GetConfiguration<NetworkConfiguration>("network")?.BaseUrl ?? "").TrimEnd('/');
                string url = $"http://localhost:{_host.HttpPort}{baseUrl}/web/index.html";
                using var response = await _http.GetAsync(url, token).ConfigureAwait(false);
                if (!response.IsSuccessStatusCode)
                {
                    InjectionStatus.Checked(null, $"index.html returned HTTP {(int)response.StatusCode}");
                    return null;
                }
                string html = await response.Content.ReadAsStringAsync(token).ConfigureAwait(false);
                bool injected = html.Contains("ThemeBuilder/editor.js", StringComparison.Ordinal);
                InjectionStatus.Checked(injected, null);
                return injected;
            }
            catch (OperationCanceledException) when (token.IsCancellationRequested)
            {
                throw;
            }
            catch (Exception ex)
            {
                InjectionStatus.Checked(null, ex.GetBaseException().Message);
                _logger.LogDebug(ex, "[ThemeBuilder] Could not fetch index.html to check the script injection.");
                return null;
            }
        }

        // A warning in Dashboard > Activity, where an admin will see it without opening the logs.
        private async Task ReportProblemAsync(string overview)
        {
            if (_reportedProblem) return;
            _reportedProblem = true;
            try
            {
                await _activity.CreateAsync(new ActivityLog("Theme Builder couldn't add its script to the web client", "ThemeBuilderInjection", Guid.Empty)
                {
                    ShortOverview = "The theme still shows, but the Theme Editor, transparent top bar, night mode and per-title accent won't load.",
                    Overview = overview,
                    LogSeverity = LogLevel.Warning
                }).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[ThemeBuilder] Could not add the injection problem to the activity log.");
            }
        }

        // Registers with every loaded File Transformation copy not registered yet. false: none of them has accepted yet
        // (error says why; a later try may work). null: File Transformation isn't usable at all. true otherwise.
        private bool? TryRegister(out Exception? error, out int copies)
        {
            error = null;
            string json = JsonSerializer.Serialize(new
            {
                id = "7c1e2b9a-4d3f-4a8e-9b61-5f2d8c0e1a47",
                // Must be exactly "index.html". File Transformation groups transformations by this string and
                // runs only one group per file: an exact name match wins, and other plugins register
                // "index.html", so any other pattern here is never run for the real page.
                // The same group also runs (as a regex) on chunks like "itemDetails-index-html.<hash>.chunk.js";
                // InjectThemeEditorScript leaves anything that isn't a full HTML document untouched.
                fileNamePattern = "index.html",
                callbackAssembly = typeof(Plugin).Assembly.FullName,
                callbackClass = typeof(Plugin).FullName,
                callbackMethod = nameof(Plugin.InjectThemeEditorScript)
            });

            // Every loaded copy, newest first; the first one found may be one whose services were disposed.
            var candidates = AssemblyLoadContext.All.SelectMany(c => c.Assemblies)
                .Concat(AppDomain.CurrentDomain.GetAssemblies())
                .Where(a => a.FullName != null && a.FullName.Contains(".FileTransformation"))
                .Distinct()
                .Reverse()
                .ToList();
            copies = candidates.Count;
            if (candidates.Count == 0)
            {
                InjectionStatus.Set("unavailable", "File Transformation isn't loaded.");
                _logger.LogWarning("[ThemeBuilder] File Transformation plugin assembly not found in the loaded assembly list. " +
                    "Is it installed and did it load successfully? (A crash in an unrelated plugin during boot can prevent " +
                    "other plugins' assemblies from ever loading, which will land you here silently.)");
                return null;
            }

            bool anyUsable = false;
            foreach (var ftAssembly in candidates)
            {
                var registerMethod = ftAssembly.GetType("Jellyfin.Plugin.FileTransformation.PluginInterface")?.GetMethod("RegisterTransformation");
                var parameters = registerMethod?.GetParameters();
                if (registerMethod == null || parameters == null || parameters.Length != 1) continue;
                anyUsable = true;
                if (_registered.Contains(ftAssembly)) continue;
                try
                {
                    // File Transformation expects a Newtonsoft JObject. Build it with the JObject type this copy was
                    // compiled against (its own parameter type), so no compile-time Newtonsoft reference is needed
                    // and a second Newtonsoft copy can't cause a type mismatch.
                    var parseMethod = parameters[0].ParameterType.GetMethod("Parse", new[] { typeof(string) });
                    if (parseMethod == null) continue;
                    var payload = parseMethod.Invoke(null, new object[] { json });
                    registerMethod.Invoke(null, new object?[] { payload });
                    _registered.Add(ftAssembly);
                    _logger.LogInformation("[ThemeBuilder] Successfully registered script injection (File Transformation copy {Index} of {Count}, load context {Context}).",
                        candidates.IndexOf(ftAssembly) + 1, candidates.Count, AssemblyLoadContext.GetLoadContext(ftAssembly)?.Name);
                }
                catch (Exception ex)
                {
                    error = ex;
                }
            }

            if (!anyUsable)
            {
                InjectionStatus.Set("unavailable", "File Transformation has no RegisterTransformation method (incompatible version).");
                _logger.LogWarning("[ThemeBuilder] File Transformation was found but its PluginInterface.RegisterTransformation was not. " +
                    "It may be an incompatible version.");
                return null;
            }
            return _registered.Count > 0;
        }
    }
}
