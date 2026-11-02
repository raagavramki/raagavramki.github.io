# Release & rollback runbook

The live site is GitHub Pages served from the **repository root of `main`**. The root contains
*generated* files (`index.html`, `_next/`, `about/`, …); the source lives in `site/`.
**Merging to `main` is the deploy.** Nothing in this repo pushes automatically.

## Safety rails

| What | Where |
|---|---|
| V1 tag (known-good, pre-redesign) | `portfolio-v1-2026-11-02` → `5f888e0` |
| Independent private archive | `github.com/raagavramki/portfolio-v1-archive` (branches + tags) |
| Offline bundle | `~/Backups/raagavramki.github.io-v1-2026-11-02.bundle` |
| V2 development branch | `feature/research-portfolio-v2` |

Never force-push `main`. Never run a deploy from `main`. Keep the tag, archive and bundle after launch.

## 1. Develop and test locally (no root files change)

```bash
cd site
npm install
npm run dev            # http://localhost:3000
npm run typecheck
npm run build          # static export -> site/out
npm run check          # broken internal links, CV PDF parity, lists TBD markers
npm run preview        # serves site/out at http://localhost:4173
```

Draft case studies (`visibility: "draft"`) are **excluded from builds** unless you set
`NEXT_PUBLIC_SHOW_DRAFTS=1`. Use that for local review only, never for a release build:

```bash
NEXT_PUBLIC_SHOW_DRAFTS=1 npm run dev
```

## 2. Release (only after explicit approval)

Pre-release checklist:

- [ ] Every `TBD` resolved. `npm run check -- --release` fails while any remain.
- [ ] Updated CV PDF supplied and copied to **both** `site/public/resume.pdf` and `site/public/assets/resume.pdf` (identical bytes).
- [ ] Employer/permission sign-off for any engineering case study based on work-related material before its `visibility` is set to `"public"`.
- [ ] Publication metadata re-verified against the DOI landing pages.
- [ ] Manual pass at 375 px and 1440 px: nav, keyboard focus, reduced motion, every route, PDFs.
- [ ] Before/after screenshots attached to the PR.

```bash
git switch -c release/v2 feature/research-portfolio-v2
./deploy.sh            # builds, checks (--release), syncs site/out -> root, STAGES only
git diff --cached --stat
git commit -m "Release: portfolio V2"
git push -u origin release/v2
gh pr create --base main --head release/v2
```

Review the PR (source **and** generated root files), then merge. GitHub Pages redeploys in 1–2 minutes.
Afterwards, propose branch protection on `main` (PR required, no force-push).

## 3. Rollback

Prefer a reviewed restore commit; avoid rewriting history.

```bash
git switch -c rollback/to-v1 main
git restore --source=portfolio-v1-2026-11-02 --staged --worktree -- . ':!site'
# also remove files V2 added at the root that V1 did not have:
git diff --name-status portfolio-v1-2026-11-02 -- . ':!site' | awk '$1=="A"{print $2}' | xargs -r git rm -rq
git commit -m "Rollback: restore V1 site (portfolio-v1-2026-11-02)"
git push -u origin rollback/to-v1   # then PR -> main, or fast-merge if the site is broken
```

If GitHub itself is unavailable or the repository is damaged:

```bash
git clone https://github.com/raagavramki/portfolio-v1-archive.git   # or:
git clone ~/Backups/raagavramki.github.io-v1-2026-11-02.bundle restored
git -C restored checkout portfolio-v1-2026-11-02
```

Then push that tree to a new `raagavramki.github.io` repository.

## Retired scripts

`deploy.ps1` and `site/deploy.js` now exit with a deprecation message. The previous
`deploy.sh` deleted root files, ran `git add -A`, committed and pushed in one step.
