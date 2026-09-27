# Runs tests/editor-test.html in headless Chrome and prints the results.
# Usage:  powershell -File tests\run-tests.ps1      (exit code 0 = all passed)

$ErrorActionPreference = 'Stop'
$page = Join-Path $PSScriptRoot 'editor-test.html'
$chrome = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $chrome) { Write-Error 'Chrome or Edge not found.'; exit 2 }

$profileDir = Join-Path $env:TEMP ("tb-test-" + [guid]::NewGuid())
$url = 'file:///' + ($page -replace '\\', '/')
$dom = & $chrome --headless=new --disable-gpu --allow-file-access-from-files "--user-data-dir=$profileDir" `
    --virtual-time-budget=15000 --dump-dom $url 2>$null | Out-String
Remove-Item -Recurse -Force $profileDir -ErrorAction SilentlyContinue

$text = [System.Net.WebUtility]::HtmlDecode(([regex]::Match($dom, '(?s)<pre id="out">(.*?)</pre>')).Groups[1].Value)
foreach ($line in $text -split "`n") {
    if ($line -like 'FAIL*') { Write-Host $line -ForegroundColor Red }
    elseif ($line -like 'RESULT*') { Write-Host $line -ForegroundColor Cyan }
    elseif ($line) { Write-Host $line }
}
if ($text -notmatch 'RESULT: \d+ passed, 0 failed') { exit 1 }
exit 0
