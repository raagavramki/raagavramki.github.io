#!/bin/bash
# Guarded, STAGE-ONLY release script for raagavramki.github.io.
#
# It builds the site, syncs the generated output into the repo root and stages
# ONLY those generated paths. It never commits and never pushes: review the
# staged diff, then commit and open a PR yourself (see site/RELEASE.md).
#
# Refuses to run on main/master or with uncommitted changes.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

# Paths in the repo root that are NOT build output and must never be touched.
PROTECTED=(site .git .claude .gitignore .nojekyll deploy.sh deploy.ps1 package-lock.json node_modules .DS_Store)

is_protected() {
  local p
  for p in "${PROTECTED[@]}"; do [ "$1" = "$p" ] && return 0; done
  return 1
}

branch="$(git rev-parse --abbrev-ref HEAD)"
if [ "$branch" = "main" ] || [ "$branch" = "master" ]; then
  echo "Refusing to run on '$branch'. Use a release branch (e.g. release/v2) and merge via PR." >&2
  exit 1
fi

if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "Working tree has uncommitted changes. Commit or stash them first." >&2
  git status --short --untracked-files=no >&2
  exit 1
fi

echo "==> Type-check, build and link-check (site/)"
(
  cd site
  npm run typecheck
  npm run build
  npm run check -- --release
)

OUT="$ROOT/site/out"
[ -f "$OUT/index.html" ] || { echo "site/out/index.html missing; build failed?" >&2; exit 1; }

# Everything the build produced, plus tracked root leftovers from older builds.
declare -a generated=()
for e in "$OUT"/* "$OUT"/.[!.]*; do
  [ -e "$e" ] || continue
  generated+=("$(basename "$e")")
done
while IFS= read -r top; do
  is_protected "$top" && continue
  [ -e "$OUT/$top" ] || generated+=("$top")   # stale: tracked at root, no longer built
done < <(git ls-files | awk -F/ '{print $1}' | sort -u)

echo "==> Syncing generated output into repo root"
for name in "${generated[@]}"; do
  is_protected "$name" && continue
  rm -rf "$ROOT/$name"
  [ -e "$OUT/$name" ] && cp -R "$OUT/$name" "$ROOT/$name"
done
touch .nojekyll

echo "==> Staging generated paths only"
to_stage=()
for name in "${generated[@]}" .nojekyll; do
  is_protected "$name" && [ "$name" != ".nojekyll" ] && continue
  to_stage+=("$name")
done
git add -A -- "${to_stage[@]}"

echo
git diff --cached --stat | tail -25
echo
echo "Staged only. NOT committed, NOT pushed."
echo "Next: review 'git diff --cached', commit on this branch, open a PR to main."
