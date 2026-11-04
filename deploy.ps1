# DEPRECATED. The old script deleted root files and pushed straight to GitHub.
# Use ./deploy.sh (macOS/Linux/WSL) - it only STAGES generated files and never
# commits or pushes. See site/RELEASE.md for the release runbook.
Write-Host "deploy.ps1 is deprecated. Use ./deploy.sh and follow site/RELEASE.md." -ForegroundColor Yellow
exit 1
