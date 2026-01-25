#!/bin/bash

# Deploy script for raagavramki.github.io
# Run this from the repo root after making changes

echo "Building Next.js site..."
cd site
npm run build

if [ $? -ne 0 ]; then
    echo "Build failed! Fix errors and try again."
    exit 1
fi

echo "Cleaning old files from root..."
cd ..
# Remove old build files (but keep site/, .git/, .gitignore, .nojekyll, .claude/)
find . -maxdepth 1 -type f ! -name '.gitignore' ! -name '.nojekyll' ! -name 'deploy.sh' ! -name 'deploy.ps1' -delete
rm -rf _next about contact projects resume 404 assets index.txt

echo "Copying new build to root..."
cp -r site/out/* .

echo "Ensuring .nojekyll exists..."
touch .nojekyll

echo "Staging all changes..."
git add -A

echo "Committing..."
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"

echo "Pushing to GitHub..."
git push

echo ""
echo "Done! Your site will be live at https://raagavramki.github.io in 1-2 minutes."
