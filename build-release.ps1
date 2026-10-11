# Builds a release package of Theme Builder:
#   release\ThemeBuilder_<version>.zip   DLL + meta.json, ready to unzip into /config/plugins/ThemeBuilder/
#   release\manifest.json                Jellyfin plugin-repository manifest (with the zip's MD5 checksum)
#   release\checksums.txt                MD5 and SHA-256 of the zip
#
# Usage:
#   powershell -File build-release.ps1
#   powershell -File build-release.ps1 -SourceUrlBase "https://example.com/jellyfin"   # where the zip will be hosted
#   powershell -File build-release.ps1 -SkipTests
#
# To install from a repository instead of copying files: host manifest.json and the zip, then add the
# manifest URL in Dashboard > Plugins > Repositories.

param(
    [string]$SourceUrlBase = "https://YOUR-HOST/jellyfin-plugins",
    [string]$TargetAbi = "12.1.0.0",
    [string]$Changelog = "",
    [string]$ImageUrl = "https://raw.githubusercontent.com/TNT24/JellyfinThemeBuilder/main/assets/thumb.png",
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
    autoUpdate  = $false
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
        imageUrl    = $ImageUrl
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
[IO.File]::WriteAllText((Join-Path $outDir 'manifest.json'), (ConvertTo-Json -InputObject $manifest -Depth 5), (New-Object Text.UTF8Encoding $false))

Write-Host ""
Write-Host "Release $version" -ForegroundColor Green
Write-Host "  $zip"
Write-Host "  MD5     $md5"
Write-Host "  SHA-256 $sha"
Write-Host "  manifest.json sourceUrl: $($SourceUrlBase.TrimEnd('/'))/$zipName"
