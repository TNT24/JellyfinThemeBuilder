<p align="center"><img src="assets/logo.svg" width="128" alt="Theme Builder logo"></p>

<h1 align="center">Theme Builder for Jellyfin</h1>

Restyle Jellyfin without writing CSS. Theme Builder adds a **Theme Editor** to the web client with a live preview. You can change colours, cards, the top bar, details pages, the player and more, then save the theme for every user, including the TV apps.

## Requirements

- **Jellyfin 12.1** (`targetAbi 12.1.0.0`, .NET 10)
- **[File Transformation](https://github.com/IAmParadox27/jellyfin-plugin-file-transformation)** plugin, installed and enabled. Theme Builder uses it to add the theme and the editor to the web client.

## Installation

1. In Jellyfin, go to **Dashboard → Plugins → Repositories** and click **+**.
2. Add this repository URL:
   ```
   https://raw.githubusercontent.com/TNT24/JellyfinThemeBuilder/main/manifest.json
   ```
3. Open **Catalog**, find **Theme Builder** (under General) and install it.
4. Restart Jellyfin.

If you installed an older copy by hand, delete `/config/plugins/ThemeBuilder*` before installing from the repository so you don't end up with two copies.

### Manual install

Download the zip from the [latest release](https://github.com/TNT24/JellyfinThemeBuilder/releases/latest), unzip it into `/config/plugins/ThemeBuilder/` and restart Jellyfin.

## Using it

1. Open the user menu (your profile picture, top right) and choose **Theme Editor**. Only administrators see it.
2. Change options on the right. The preview and the page behind it update live.
3. Try a **Preset**, search for options, or click **Changed only** to review your edits.
4. Click **Save & Reload**. The theme applies to everyone.

The plugin's page in **Dashboard → Plugins → Theme Builder** shows status checks, the current theme and a changelog.

### Safety net

- **Close without saving** discards everything (you're asked first).
- **Undo / Redo** (Ctrl+Z / Ctrl+Y) while editing.
- **Previous save** brings back the theme from before your last save.
- **Export / Import** gives you a code to back up or share a theme.

## What you can change

| Area | Options |
|---|---|
| **Colours & background** | Accent, page and menu colours, true OLED black, an accent that matches each title's artwork, a background image or soft accent glow, frosted-glass menus |
| **Top bar** | Colour, opacity and blur, your own logo, transparent until you scroll, centred title, hiding the search, cast or SyncPlay icons |
| **Cards & posters** | Poster size, corner radius (separately for wide tiles), spacing, hover zoom or glow, borders, shadows, card button colours, titles on the poster |
| **Watched, ratings & badges** | Dimmed watched items, badge and progress-bar colours and positions, hiding ratings |
| **Details pages** | Banner darkness and blur, title size and alignment, accent or solid Play buttons, hiding the poster or any button, line or section (cast, similar, extras…) |
| **Home, libraries & episodes** | Home row titles and spacing, the My Media row, library toolbar buttons, episode descriptions and thumbnail size |
| **Video player** | Player accent colours, subtitle style and size |
| **Login page** | Background, blur, logo and welcome text |
| **Night mode** | Automatic dimming at night (browsers only) |
| **User themes** | Optional personal themes each user can pick from their menu (**My Theme**) |

Presets include Jellyfin Default, OLED Black, Minimal, Netflix Red, Disney+, Apple TV+, Nord and Purple Haze.

## How it reaches every device

- **Browsers and the Android/iOS apps:** the plugin adds the theme and the editor to the web client through File Transformation.
- **TV apps (Samsung Tizen, LG webOS):** these carry their own copy of the web client and only receive the server's **Custom CSS**. When you save, Theme Builder writes the theme into a marked block at the top of **Dashboard → General → Custom CSS**. Anything else you keep there is left untouched. If that block goes missing, the server puts it back when it starts.
- TV apps show the theme but not the editor, personal themes, night mode or the per-title accent, which all need the browser script. TVs have no mouse, so the hover glow appears as a ring on the focused card instead.
- After a plugin update, the theme is rebuilt the first time an administrator opens the web client, so new fixes reach the TV apps too.

## Troubleshooting

- **No "Theme Editor" in the menu:** it's for administrators only. On the plugin page, **Theme added to the web client** must be green. If it isn't, make sure File Transformation is installed and enabled, then restart Jellyfin.
- **Changes don't show:** clear the browser's site data for Jellyfin (F12 → Application → Clear site data) and reload.
- **A page looks blank or broken:** open the Theme Editor and click **Diagnostics**. It checks that the page scripts aren't damaged and that everything is up to date.

## Building from source

```powershell
dotnet build -c Release                  # bin/Release/net10.0/JellyfinThemeBuilder.dll
powershell -File tests/run-tests.ps1     # editor tests in headless Chrome
powershell -File build-release.ps1 -SourceUrlBase "https://github.com/TNT24/JellyfinThemeBuilder/releases/download/vX.Y.Z"
```

`build-release.ps1` runs the tests, builds, and writes `release/ThemeBuilder_<version>.zip` and `release/manifest.json`. To publish a release:

1. Bump `<Version>` in `JellyfinThemeBuilder.csproj`.
2. Run `build-release.ps1` with the release's download URL, as above.
3. Copy `release/manifest.json` to the repo root, then commit and push.
4. Run `gh release create vX.Y.Z release/ThemeBuilder_X.Y.Z.0.zip`.

Development notes and lessons learned are in [PLUGIN_NOTES.md](PLUGIN_NOTES.md).
