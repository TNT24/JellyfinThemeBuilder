using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Text.Json;

namespace JellyfinThemeBuilder.Api
{
    [ApiController]
    [Route("ThemeBuilder")]
    [AllowAnonymous]
    public class CssController : ControllerBase
    {
        private const string EditorResource = "JellyfinThemeBuilder.Web.editor.js";

        // The script only changes with the DLL, so read and fill it in once.
        private static string? _editorScript;

        private readonly ILogger<CssController> _logger;

        public CssController(ILogger<CssController> logger)
        {
            _logger = logger;
        }

        // The live editor, theme runtime and menu entries (Web/editor.js, embedded in the DLL).
        [HttpGet("editor.js")]
        [Produces("application/javascript")]
        public IActionResult GetEditorScript()
        {
            if (_editorScript == null)
            {
                using Stream? stream = typeof(Plugin).Assembly.GetManifestResourceStream(EditorResource);
                if (stream == null)
                {
                    _logger.LogError("[ThemeBuilder] Embedded resource {Resource} is missing from the DLL.", EditorResource);
                    return Content("console.error('[ThemeBuilder] editor.js is missing from the plugin DLL.');", "application/javascript");
                }

                using var reader = new StreamReader(stream);
                _editorScript = reader.ReadToEnd()
                    .Replace("__TB_PLUGIN_ID__", Plugin.PluginGuid)
                    .Replace("__TB_VERSION__", Plugin.VersionText);
            }

            Response.Headers.CacheControl = "no-cache";
            return Content(_editorScript, "application/javascript");
        }

        // The stylesheet the editor generated on its last save.
        [HttpGet("style.css")]
        [Produces("text/css")]
        public IActionResult GetCustomCss()
        {
            try
            {
                // Saved changes should show on the next page load, not whenever the browser cache expires.
                Response.Headers.CacheControl = "no-cache";
                return Content(Plugin.Instance.Configuration.GeneratedCss ?? string.Empty, "text/css");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[ThemeBuilder] Failed to serve the saved theme CSS.");
                return Content($"/* Error: {ex.Message} */", "text/css");
            }
        }

        private static JsonElement EmptyObject()
        {
            using var doc = JsonDocument.Parse("{}");
            return doc.RootElement.Clone();
        }

        // The saved theme settings (appearance only, nothing sensitive). Plugin configuration itself needs an
        // administrator, but every user's browser needs these for personal themes and the automatic accent.
        [HttpGet("settings")]
        [Produces("application/json")]
        public IActionResult GetSettings()
        {
            Response.Headers.CacheControl = "no-cache";
            var config = Plugin.Instance.Configuration;
            // Serialize properly so a damaged SettingsJson can't make the whole response invalid (every user's
            // browser reads this); fall back to no settings, i.e. the defaults.
            JsonElement settings;
            try
            {
                using var doc = JsonDocument.Parse(string.IsNullOrWhiteSpace(config.SettingsJson) ? "{}" : config.SettingsJson);
                settings = doc.RootElement.ValueKind == JsonValueKind.Object ? doc.RootElement.Clone() : EmptyObject();
            }
            catch (JsonException ex)
            {
                _logger.LogWarning(ex, "[ThemeBuilder] The saved theme settings are not valid JSON; serving the defaults.");
                settings = EmptyObject();
            }

            string json = JsonSerializer.Serialize(new { version = Plugin.VersionText, cssVersion = config.CssVersion ?? "", settings });
            return Content(json, "application/json");
        }
    }
}
