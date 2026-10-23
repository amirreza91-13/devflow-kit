$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ProjectRoot

if (-not (Test-Path (Join-Path $ProjectRoot 'index.html'))) {
    throw 'index.html was not found. Extract the complete DevFlow Kit ZIP and run this script from the extracted project folder.'
}
if (-not (Test-Path (Join-Path $ProjectRoot 'src\app.js'))) {
    throw 'src\app.js was not found. The project files appear incomplete.'
}

$Python = Get-Command py -ErrorAction SilentlyContinue
if ($Python) {
    $PythonArgs = @('-m', 'http.server', '8000', '--bind', '127.0.0.1')
    $PythonExe = $Python.Source
    if ($PythonExe -match 'py\.exe$') { $PythonArgs = @('-3', '-m', 'http.server', '8000', '--bind', '127.0.0.1') }
} else {
    $Python = Get-Command python -ErrorAction SilentlyContinue
    if (-not $Python) { throw 'Python was not found. Install Python or run: python -m http.server 8000' }
    $PythonExe = $Python.Source
    $PythonArgs = @('-m', 'http.server', '8000', '--bind', '127.0.0.1')
}

$Url = 'http://127.0.0.1:8000/'
Write-Host "DevFlow Kit root: $ProjectRoot" -ForegroundColor Green
Write-Host "Opening $Url" -ForegroundColor Cyan
Start-Process $Url
Write-Host 'Keep this window open while using DevFlow Kit. Press Ctrl+C to stop the local server.' -ForegroundColor Yellow
& $PythonExe @PythonArgs
