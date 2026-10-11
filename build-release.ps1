# Builds a release package of Theme Builder:
#   release\ThemeBuilder_<version>.zip   DLL + meta.json, ready to unzip into /config/plugins/ThemeBuilder/
#   release\manifest.json                Jellyfin plugin-repository manifest (with the zip's MD5 checksum)
#   manifest.json                        the same, at the repo root: what users' servers read
#   release\checksums.txt                MD5 and SHA-256 of the zip
#
# Usage:
#   powershell -File build-release.ps1
#   powershell -File build-release.ps1 -Changelog "What changed"
#   powershell -File build-release.ps1 -SourceUrlBase "https://example.com/jellyfin"   # host the zip elsewhere
#   powershell -File build-release.ps1 -SkipTests
#
# By default the zip is expected at the GitHub release v<major.minor.patch>. After running:
#   git add manifest.json; git commit; git push
#   gh release create v<version> release\ThemeBuilder_<version>.0.zip

param(
    [string]$SourceUrlBase = "",           # default: this version's GitHub release download URL
    [string]$TargetAbi = "12.1.0.0",
    [string]$Changelog = "",
    [string]$ImageUrl = "",                # catalog image; default: assets/thumb.jpg on GitHub
    [switch]$NoImage,                      # leave the catalog image out
    [string]$DefaultImageUrl = "https://raw.githubusercontent.com/TNT24/JellyfinThemeBuilder/main/assets/thumb.jpg",
    [switch]$SkipTests
)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

if (-not $SkipTests) {
    Write-Host "Running tests..." -ForegroundColor Cyan
    & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'tests\run-tests.ps1')
    if ($LASTEXITCODE -ne 0) { Write-Error "Tests failed; not packaging. (Use -SkipTests to override.)" }
}

Write-Host "Building..." -ForegroundColor Cyan
dotnet build -c Release --nologo -v q
if ($LASTEXITCODE -ne 0) { Write-Error "Build failed." }

$dll = Join-Path $PSScriptRoot 'bin\Release\net10.0\JellyfinThemeBuilder.dll'
$version = (Get-Item $dll).VersionInfo.FileVersion          # e.g. 1.2.0.0
$guid = ([regex]::Match((Get-Content (Join-Path $PSScriptRoot 'Plugin.cs') -Raw), 'PluginGuid = "([0-9a-f-]+)"')).Groups[1].Value
$timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$description = "Live theme editor for the Jellyfin web client: colours, cards, details pages, player, presets and more."
$overview = "Adds a Theme Editor to the user menu with a live preview. The theme applies to every web client and is copied into Custom CSS for TV apps."
$tag = 'v' + ([version]$version).ToString(3)
if (-not $SourceUrlBase) { $SourceUrlBase = "https://github.com/TNT24/JellyfinThemeBuilder/releases/download/$tag" }
if (-not $ImageUrl -and -not $NoImage) { $ImageUrl = $DefaultImageUrl }

$outDir = Join-Path $PSScriptRoot 'release'
$stage = Join-Path $outDir 'stage'
if (Test-Path $stage) { Remove-Item -Recurse -Force $stage }
New-Item -ItemType Directory -Force $stage | Out-Null
Copy-Item $dll $stage

# meta.json: what Jellyfin writes next to an installed plugin. Shipping it keeps name/version/status correct.
$meta = [ordered]@{
    category    = "General"
    changelog   = $Changelog
    description = $description
    guid        = $guid
    name        = "Theme Builder"
    overview    = $overview
    owner       = "Mark"
    targetAbi   = $TargetAbi
    timestamp   = $timestamp
    version     = $version
    status      = "Active"
    autoUpdate  = $true          # Jellyfin keeps this value when installing from the repository
    assemblies  = @("JellyfinThemeBuilder.dll")
}
[IO.File]::WriteAllText((Join-Path $stage 'meta.json'), ($meta | ConvertTo-Json), (New-Object Text.UTF8Encoding $false))

$zipName = "ThemeBuilder_$version.zip"
$zip = Join-Path $outDir $zipName
if (Test-Path $zip) { Remove-Item $zip }
Compress-Archive -Path (Join-Path $stage '*') -DestinationPath $zip
Remove-Item -Recurse -Force $stage

$md5 = (Get-FileHash $zip -Algorithm MD5).Hash.ToLower()
$sha = (Get-FileHash $zip -Algorithm SHA256).Hash.ToLower()
"$md5  $zipName  (MD5)`n$sha  $zipName  (SHA-256)" | Set-Content -Encoding utf8 (Join-Path $outDir 'checksums.txt')

# Repository manifest: Jellyfin verifies the downloaded zip against "checksum" (MD5).
$manifest = @(
    [ordered]@{
        guid        = $guid
        name        = "Theme Builder"
        description = $description
        overview    = $overview
        owner       = "Mark"
        category    = "General"
        versions    = @(
            [ordered]@{
                version   = $version
                changelog = $Changelog
                targetAbi = $TargetAbi
                sourceUrl = "$($SourceUrlBase.TrimEnd('/'))/$zipName"
                checksum  = $md5
                timestamp = $timestamp
            }
        )
    }
)
# Only list a catalog image when there is one; an empty imageUrl makes Jellyfin try to download nothing.
if ($ImageUrl) { $manifest[0].Insert(6, 'imageUrl', $ImageUrl) }
$manifestJson = ConvertTo-Json -InputObject $manifest -Depth 5
[IO.File]::WriteAllText((Join-Path $outDir 'manifest.json'), $manifestJson, (New-Object Text.UTF8Encoding $false))
# The copy users' servers read (raw.githubusercontent.com/.../main/manifest.json), so it can't drift from the release.
[IO.File]::WriteAllText((Join-Path $PSScriptRoot 'manifest.json'), $manifestJson, (New-Object Text.UTF8Encoding $false))

Write-Host ""
Write-Host "Release $version" -ForegroundColor Green
Write-Host "  $zip"
Write-Host "  MD5     $md5"
Write-Host "  SHA-256 $sha"
Write-Host "  manifest.json sourceUrl: $($SourceUrlBase.TrimEnd('/'))/$zipName"
Write-Host ""
Write-Host "Next: commit and push manifest.json, then:" -ForegroundColor Cyan
Write-Host "  gh release create $tag release\$zipName --title `"Theme Builder $(([version]$version).ToString(3))`""
