# Jellyfin Plugin Development Notes

Lessons from building **Theme Builder** (Jellyfin 12.1, Docker, MUI web layout, Tizen TV client).
Read this before starting the next plugin.

---

## 1. Project setup

- Target the server's runtime: `net10.0` for Jellyfin 12.1.
- Reference packages pinned to the server's minor version:
  ```xml
  <PackageReference Include="Jellyfin.Model" Version="12.1.*" />
  <PackageReference Include="Jellyfin.Controller" Version="12.1.*" />
  ```
- Embedded pages must be listed in the csproj (`<EmbeddedResource Include="Configuration\configPage.html" />`),
  and the `EmbeddedResourcePath` is `<RootNamespace>.<Folder>.<File>` (e.g. `JellyfinThemeBuilder.Configuration.configPage.html`).
- Build: `dotnet build -c Release`. Deploy the DLL to `/config/plugins/<PluginName>/`, restart the container.
- Give every plugin its own **unique GUID** (don't reuse placeholder GUIDs like `12345678-...`). Keep it in one
  `const` and hand it to any client script from the server (Theme Builder replaces `__TB_PLUGIN_ID__` in editor.js).
- Set `<Version>`/`<AssemblyVersion>` in the csproj and bump it every release, or Dashboard > Plugins can't tell builds apart.
- When the GUID or version changes on a manually installed plugin, delete the plugin folder's `meta.json` before
  restarting so Jellyfin regenerates it from the DLL (it caches id/version/status there).
- Keep only one `PluginConfiguration` class. A stray duplicate in another namespace compiles fine and confuses everyone.

## 2. Plugin class basics

- `BasePlugin<TConfig>` + `IHasWebPages` for a dashboard config page.
- Store `Instance` statically in the constructor so controllers can read `Plugin.Instance.Configuration`.
- Save config from code with `Plugin.Instance.SaveConfiguration()`. From the browser, use
  `ApiClient.getPluginConfiguration(id)` / `ApiClient.updatePluginConfiguration(id, config)` (admin only).

## 3. Hosted services / DI: they don't run unless registered

An `IHostedService` class in your assembly is **not** picked up automatically. Register it:

```csharp
public class PluginServiceRegistrator : IPluginServiceRegistrator
{
    public void RegisterServices(IServiceCollection services, IServerApplicationHost host)
        => services.AddHostedService<MyStartup>();
}
```

Symptom if missing: no log lines from the service, nothing happens, no error.

## 4. API controllers

- `[ApiController]`, `[Route("MyPlugin")]`, inherit `ControllerBase`. They're discovered automatically.
- `[AllowAnonymous]` for assets that the page loads before/without login (JS, CSS).
- Set `Response.Headers.CacheControl = "no-cache"` on dynamic JS/CSS or browsers keep stale copies.
- Serving a big JS file from a C# raw string (`"""..."""`) works well: no escaping, and JS `${...}` is safe
  as long as the raw string isn't `$"""` interpolated.

## 5. Injecting into the web client (File Transformation plugin)

Repo: https://github.com/IAmParadox27/jellyfin-plugin-file-transformation

- Call it via **reflection** (no compile-time dependency):
  find the assembly containing `.FileTransformation`, type `Jellyfin.Plugin.FileTransformation.PluginInterface`,
  method `RegisterTransformation`, and pass a **Newtonsoft `JObject`** (resolve `Newtonsoft.Json.Linq.JObject` at runtime and call `Parse`).
- Payload fields: `id` (GUID), `fileNamePattern`, `callbackAssembly` (`Assembly.FullName`),
  `callbackClass` (`Type.FullName`), `callbackMethod`.
- Callback signature: `public static string Method(PayloadClass payload)` where the payload has
  `[JsonPropertyName("contents")] string? Contents`. Return the new file contents.

### ⚠️ `fileNamePattern` is a REGEX

`"index.html"` also matched `itemDetails-index-html.<hash>.chunk.js` (`.` = any char). The injector then
put a `<link>` at the start of a JS chunk → `SyntaxError: Unexpected token '<'` + `ChunkLoadError` →
**item detail pages rendered black/empty**. It took several wrong CSS "fixes" before the console showed it.

But you can't simply fix the pattern: File Transformation groups transformations by the exact pattern
string and runs **one** group per file. An exact file name match wins; otherwise the first key whose regex
matches. Other plugins register `"index.html"`, so a different pattern (`index\.html`, anchored, etc.) is a
separate group that **never runs for index.html**: the script silently stops being injected.

Always:
- Register exactly `"index.html"` so you join the shared group.
- Guard inside the callback (this is the real protection): only transform content that contains
  `</head>` **and** `</body>`, because that group is also run on `*-index-html.*.chunk.js`.
- Return the original contents on any exception. Never blank a file.
- Skip if already injected (check for your own marker/URL).

### ⚠️ File Transformation 3.x: registering too early fails

From 3.0, `RegisterTransformation` resolves services from the provider File Transformation was constructed with. In an
`IHostedService.StartAsync` that provider is already disposed: `ObjectDisposedException: 'IServiceProvider'`
(wrapped in a `TargetInvocationException`). Nothing is injected, and the only trace is that error in the startup log.
It works a few seconds later, once the server has finished starting (Editor's Choice registers from a startup
scheduled task). Retry in the background (Theme Builder: every 2 s for 2 minutes) instead of trying once.

### Paths

`index.html` is served from `{baseUrl}/web/`, so injected URLs must be relative and go up one level:
`../MyPlugin/editor.js`. Not `/MyPlugin/...`, which breaks when Jellyfin has a base URL.

## 6. Web client (jellyfin-web) facts

- It's an SPA. Use a `MutationObserver` on `document.body` to re-inject UI after navigation or re-render.
  Keep the callback cheap and idempotent (mark injected elements with a `data-*` attribute).
- Wait for globals before running: poll until `window.ApiClient && window.Dashboard` exist.
- Admin check: `ApiClient.getCurrentUser().then(u => u.Policy.IsAdministrator)`. Cache it per user id,
  don't call on every mutation.
- **Two UI stacks coexist.** The newer MUI layout (header, menus, library toolbar) and the legacy pages
  (the item details page lives in `src/apps/legacy/controllers/itemDetails/index.html`). Always target both.
- Adding a menu entry: the reliable hook is the **Sign Out** entry (`.btnLogout` or `[data-testid="LogoutIcon"]`).
  Clone it, swap icon/label, attach a **capture-phase** click handler with `stopImmediatePropagation`, and insert before it.
- Icons: use **inline SVG** (`fill="currentColor"`). Material icon font glyphs may not exist in the bundled font.
- Look up real class names in the jellyfin-web source instead of guessing:
  `https://raw.githubusercontent.com/jellyfin/jellyfin-web/master/<path>`.

### Useful selectors

| Thing | Selector |
|---|---|
| MUI top bar | `.MuiAppBar-root` (legacy: `.skinHeader`) |
| Selected tab / indicator | `.MuiTab-root.Mui-selected`, `.MuiTabs-indicator` |
| Play All / Shuffle (library) | `.MuiButtonGroup-root > button:has([data-testid="PlayArrowIcon"])` / `ShuffleIcon` |
| MUI "active" icon (played/fav) | `.MuiSvgIcon-colorError` + `[data-testid="CheckIcon"]` / `FavoriteIcon` |
| MUI progress bar | `.itemLinearProgress .MuiLinearProgress-bar` |
| Card poster | `.cardScalable` inside `.cardBox` inside `.card` |
| Details page root | `.itemDetailPage` |
| Details poster | `.detailImageContainer` (exclude from card hover effects) |
| Details buttons | `.mainDetailButtons .btnPlay / .btnPlayTrailer / .btnPlaystate / .btnUserRating / .btnMoreCommands …` |
| Details sections (whole block incl. heading) | `#castCollapsible`, `#guestCastCollapsible`, `#similarCollapsible`, `#specialsCollapsible`, `#scenesCollapsible`, `.nextUpSection` |
| A–Z picker | `.alphaPicker` |

## 7. CSS pitfalls

- **Never give `.backgroundContainer` an opaque background.** It's a fixed full-screen layer and `body` is
  forced `transparent !important`. Put the page colour on `html`.
- Don't use `* { border-radius }` or other universal rules. Scope everything.
- Hide a section by its **wrapper** (e.g. `#castCollapsible`), not its content, or the heading stays.
- Hover rings get clipped by scroll containers: draw them *inside* the poster (`::after`, `inset: 0`),
  raise the hovered card's `z-index`, and add vertical padding to `.emby-scroller .scrollSlider`.
- Match the hover ring's `border-radius` to the card radius explicitly and set `overflow: hidden` on `.cardScalable`.
- `:has()` needs Chrome 105+ (older TVs may ignore those rules. Acceptable for "hide" extras).
- Generating CSS in C#: use `CultureInfo.InvariantCulture` or decimals become `0,5` in some locales.
  Better: generate CSS in JS (one `buildCss()` used by both the live preview and save).

## 8. TV / mobile clients

- Tizen and webOS apps **bundle their own web client**. Your injected `index.html` script never runs there.
- What does reach them: **Branding Custom CSS** (`ApiClient.getNamedConfiguration('branding')` →
  `updateNamedConfiguration('branding', cfg)`). Write your CSS in a marked block
  (`/* MyPlugin:start */ … /* MyPlugin:end */`) and replace only that block so the user's own CSS survives.
- TVs have no hover. Use `.layout-tv .card:focus` for focus styling; wrap mouse effects in
  `@media (hover: hover) and (pointer: fine)`.
- **TV focus is blue by default**: `.card:focus … .cardScalable { border-color: … !important }`, `.emby-button.show-focus:focus`
  etc. Newer clients read `--jf-palette-secondary-main`; the older clients bundled in TV apps hard-code `#00a4dc`, so set the
  variable *and* recolour the rules. Toggles, radios and `.listItemIcon` are hard-coded blue in every version.
- TVs count as `browser.slow`, so cards get `show-focus` without `show-animation`: no zoom, and a 0.5em transparent border on
  `.cardScalable`. Any `border-radius` you force on `.cardScalable` must add 0.5em there, or the image gets square corners.
- **Older clients (10.10/10.11, what TV apps bundle) paint `.backgroundContainer` solid `#101010`** on top of `<html>`,
  so a page colour/image/gradient on `html` never shows on TV. Make it see-through (`:not(.withBackdrop)` so backdrop
  dimming stays). See-through is safe; opaque is what blacks out detail pages (§7).
- **TV base text is `.layout-tv { font-size: 125% }`** (20px minimum), phones 90%, desktop 93%. Never set one
  `html { font-size }` for all; scale each layout's base. Media-query `em` stays 16px, so em-based breakpoints
  for card counts need scaling on TV too.
- Anything tinted for `:focus` must keep a strong solid state on TV (`.show-focus:focus`); a subtle hover tint is
  unreadable from the sofa.
- **TV engines are old** (2020–2022 Tizen/webOS ≈ Chrome 69–85): no `:has()` (105), `:is()` (88) or `inset` (87).
  One unsupported selector drops the **whole rule**, so never mix a classic selector and a `:has()`/`:is()` one in one list.
- **Check the TV client's own markup, not the server's.** The detail page poster gap (32.45vw) sits on `.detailRibbon` /
  `.detailPagePrimaryContent` in 10.11+, but on `.detailPagePrimaryContainer` / `.detailPageContent` in 10.10 (where one wraps
  the other). Clone `release-10.10.z` and grep it before writing TV rules.
- On wide screens (≥100em, every TV) the classic header lifts `.headerTabs` into the title row (`margin-top: -4.3em`);
  `body.withSectionTabs` says tabs are showing.
- Classic `.headerUserButtonRound` means the user **has** a picture (a background image, not an `<img>`).

## 9. Debugging checklist (do this FIRST)

1. **Browser console (F12) for red errors.** A blank/black page is almost always a JS/chunk error, not CSS.
2. `ChunkLoadError` / `Unexpected token '<'` → something rewrote or replaced a JS file (see §5).
3. Check the element state: is the page container empty? (`document.querySelector('.mainAnimatedPages').innerHTML`)
4. `document.elementFromPoint(innerWidth/2, innerHeight/2)` → what's actually covering the screen.
5. Disable your stylesheet live: `document.querySelectorAll('link[href*="MyPlugin"]').forEach(l => l.disabled = true)`.
6. Server log for plugin registration lines. Missing lines usually mean the hosted service isn't registered (§3).
7. After deploying: restart the container **and** clear the browser cache (Application → Clear site data).
   Broken hashed chunks can stay cached even after the server is fixed.

## 10. UX patterns that worked

- Live preview: inject a `<style id="…-live">` with the generated CSS while the editor is open; remove it on close to discard.
- A mini mock preview (poster, hovered poster, buttons, banner) in its own column, updated on every input.
- Save = write settings JSON + generated CSS to plugin config, sync the branding block, then `location.reload()`.
- Keep settings as a JSON blob (`SettingsJson`) so new options need **no C# changes**. The field list in JS is the schema.
- Fixed-colour Save button (doesn't follow the theme, so it's always findable).
- Auto text contrast (WCAG luminance → black or white) for anything drawn on a user-chosen colour.

## Theme Builder 1.2.0 architecture (lessons worth reusing)

- **Keep big JS out of C#.** The editor lives in `Web/editor.js` (EmbeddedResource). The controller reads it once, replaces
  `__TB_PLUGIN_ID__` / `__TB_VERSION__` placeholders, caches it, and serves it. This means real syntax highlighting and it can be tested on its own.
- **Anonymous read-only settings endpoint.** Non-admin users can't read plugin configuration, so `GET /ThemeBuilder/settings`
  returns the public bits (settings JSON + versions). Never put secrets in there.
- **Server-side branding copy.** `IServerConfigurationManager.GetConfiguration<BrandingOptions>("branding")` /
  `SaveConfiguration("branding", …)` read and write Custom CSS from C#. Theme Builder's startup service re-adds its marked
  block from the saved CSS when it's missing or stale (`BrandingSync.Merge`, same result as the editor's save).
- **Rebuilding generated output after an update.** The server has no JS engine, so CSS is built in the browser. The config
  stores `CssVersion`; when an admin's browser sees it differs from the running plugin version, it regenerates the CSS, re-syncs
  the branding Custom CSS copy (for TV apps), and saves. So after an update, an admin has to open the web client once.
- **Personal per-user data** can be stored with `ApiClient.getDisplayPreferences(id, userId, client)` / `CustomPrefs`, with no
  server code needed. Keep a localStorage fallback.
- **Undo for admins**: store `PreviousSettingsJson` on every save that changes something.
- **Tests without a server**: `tests/editor-test.html` mocks `ApiClient`/`Dashboard`, loads the real JS with a `__TB_TEST__`
  flag that exposes internals, and `tests/run-tests.ps1` runs it via headless Chrome `--dump-dom`. Parse the CSS through
  `CSSStyleSheet.replaceSync` to catch rules the browser would silently drop.
- **Releases**: `build-release.ps1` runs tests, builds, zips DLL + meta.json, and writes a repository `manifest.json`
  (checksum = MD5 of the zip). Write JSON with `UTF8Encoding($false)`, because PowerShell 5's `Set-Content` adds a BOM.
