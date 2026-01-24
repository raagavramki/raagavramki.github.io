// deploy.js
import { existsSync, mkdirSync, rmSync, cpSync, copyFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// If this deploy.js lives inside /site, dist is /site/dist and root is repo root.
// If deploy.js lives at repo root, dist is /dist and rootDir should be __dirname (not ..).
const distDir = join(__dirname, "dist");
const rootDir = join(__dirname, "..");

if (!existsSync(distDir)) {
  throw new Error(`dist/ not found at: ${distDir}. Run "npm run build" first.`);
}

// Backup old root files (optional)
const backupDir = join(rootDir, "backup-html");
mkdirSync(backupDir, { recursive: true });
for (const f of ["index.html", "style.css", "script.js"]) {
  const src = join(rootDir, f);
  const dst = join(backupDir, f);
  if (existsSync(src)) copyFileSync(src, dst);
}

// Copy EVERYTHING from dist → root (index.html, assets/, any public files)
for (const entry of readdirSync(distDir, { withFileTypes: true })) {
  const src = join(distDir, entry.name);
  const dst = join(rootDir, entry.name);

  // Replace existing target
  rmSync(dst, { recursive: true, force: true });

  // Copy file or directory
  if (entry.isDirectory()) {
    mkdirSync(dst, { recursive: true });
    cpSync(src, dst, { recursive: true });
  } else {
    mkdirSync(dirname(dst), { recursive: true });
    copyFileSync(src, dst);
  }
}

console.log("Deployed dist/ to repo root successfully.");
