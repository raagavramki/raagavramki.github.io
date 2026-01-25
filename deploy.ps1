# Deploy script for raagavramki.github.io
# Run: .\deploy.ps1 from the repo root

$ErrorActionPreference = "Stop"

Write-Host "Building Next.js site..." -ForegroundColor Cyan
Set-Location site
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Fix errors and try again." -ForegroundColor Red
    Set-Location ..
    exit 1
}

Write-Host "Cleaning old files from root..." -ForegroundColor Cyan
Set-Location ..

# Remove old build artifacts
$itemsToRemove = @("_next", "about", "contact", "projects", "resume", "404", "assets", "index.html", "index.txt", "404.html")
foreach ($item in $itemsToRemove) {
    if (Test-Path $item) {
        Remove-Item -Recurse -Force $item
    }
}

Write-Host "Copying new build to root..." -ForegroundColor Cyan
Copy-Item -Recurse -Force site\out\* .

Write-Host "Ensuring .nojekyll exists..." -ForegroundColor Cyan
if (-not (Test-Path .nojekyll)) {
    New-Item -ItemType File -Name .nojekyll | Out-Null
}

Write-Host "Staging all changes..." -ForegroundColor Cyan
git add -A

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Write-Host "Committing..." -ForegroundColor Cyan
git commit -m "Deploy: $timestamp"

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push

Write-Host ""
Write-Host "Done! Your site will be live at https://raagavramki.github.io in 1-2 minutes." -ForegroundColor Green
