# DARYL Web - Start Dev Server
# PowerShell script to start the development server locally

param(
    [int]$Port = 5000,
    [switch]$Production = $false,
    [switch]$Build = $false
)

$projectPath = $PSScriptRoot
$scriptsPath = Join-Path $projectPath "script"

Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   DARYL Web - Development Server      ║" -ForegroundColor Cyan
Write-Host "║   Location: $projectPath" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# 1. Type check
Write-Host "[1/3] Type checking..." -ForegroundColor Yellow
npm run check
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Type check failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Type check passed" -ForegroundColor Green
Write-Host ""

# 2. Build if requested
if ($Build) {
    Write-Host "[2/3] Building for production..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Build completed" -ForegroundColor Green
    Write-Host ""
}

# 3. Start server
Write-Host "[3/3] Starting server..." -ForegroundColor Yellow
Write-Host ""

if ($Production) {
    Write-Host "🚀 Production mode" -ForegroundColor Magenta
    Write-Host "   Port: $Port" -ForegroundColor Cyan
    $env:NODE_ENV = 'production'
    $env:PORT = $Port
    npx tsx server/index.ts
} else {
    Write-Host "🔷 Development mode (HMR enabled)" -ForegroundColor Green
    Write-Host "   Port: $Port" -ForegroundColor Cyan
    Write-Host "   Open: http://localhost:$Port" -ForegroundColor Cyan
    Write-Host ""
    $env:NODE_ENV = 'development'
    $env:PORT = $Port
    npx tsx server/index.ts
}
