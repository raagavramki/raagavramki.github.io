import { copyFileSync, readdirSync, mkdirSync, existsSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = join(__dirname, 'dist');
const rootDir = join(__dirname, '..');

// Files/folders to backup (old HTML site)
const backupDir = join(rootDir, 'backup-html');
const filesToBackup = ['index.html', 'style.css', 'script.js'];

console.log('🚀 Deploying React app to root...\n');

// Step 1: Create backup directory if it doesn't exist
if (!existsSync(backupDir)) {
  mkdirSync(backupDir, { recursive: true });
  console.log('✅ Created backup directory');
}

// Step 2: Backup old HTML files
console.log('📦 Backing up old HTML files...');
filesToBackup.forEach(file => {
  const srcPath = join(rootDir, file);
  const destPath = join(backupDir, file);
  if (existsSync(srcPath)) {
    copyFileSync(srcPath, destPath);
    console.log(`   ✓ Backed up ${file}`);
  }
});

// Step 3: Copy dist contents to root
console.log('\n📋 Copying built files to root...');

// Copy index.html
copyFileSync(join(distDir, 'index.html'), join(rootDir, 'index.html'));
console.log('   ✓ Copied index.html');

// Copy assets folder
const assetsDistDir = join(distDir, 'assets');
const assetsRootDir = join(rootDir, 'assets');

// Remove old assets if exists (except img and resume.pdf)
if (existsSync(assetsRootDir)) {
  const files = readdirSync(assetsRootDir);
  files.forEach(file => {
    if (file !== 'img' && file !== 'resume.pdf' && file !== 'favicon.ico') {
      const filePath = join(assetsRootDir, file);
      rmSync(filePath, { recursive: true, force: true });
    }
  });
}

// Copy new assets
const assetFiles = readdirSync(assetsDistDir);
assetFiles.forEach(file => {
  if (file === 'img') return;
  
  const srcPath = join(assetsDistDir, file);
  const destPath = join(assetsRootDir, file);
  copyFileSync(srcPath, destPath);
  console.log(`   ✓ Copied assets/${file}`);
});

console.log('\n✨ Deployment complete!');
console.log('📁 Old HTML files backed up to: backup-html/');
console.log('🌐 Your React app is now in the root directory');
console.log('\n💡 Next steps:');
console.log('   1. Test locally by opening index.html in your browser');
console.log('   2. Commit and push to GitHub:');
console.log('      git add .');
console.log('      git commit -m "Deploy React app"');
console.log('      git push');

