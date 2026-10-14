# HANDOFF — APEX retheme session (2026-10-14, resume tomorrow)

## Where everything stands
- Repo: `C:\Users\LOQ\summit-clone` (remote `RajeshKc777/Real-Estate-`), static site, GitHub Pages.
- Branch: work done on `phase2/borderline-theme`, **merged to `main` and pushed** (`1b4f10f`).
  `main` == `origin/main` (clean). Rollback tag `baseline/pre-phase2` pushed too.
- Live: `https://rajeshkc777.github.io/Real-Estate-/` (allow ~2 min Pages deploy after pushes; always hard-refresh / use `?fresh=N`).
- Local preview: `http://127.0.0.1:8000/` via `python serve.py`-equivalent in Temp
  (`C:\Users\LOQ\AppData\Local\Temp\opencode\serve.py` — restart it; it doesn't survive reboot).
- Docs: `docs/00-INDEX.md` (map), `BASELINE.md` (hashes + rollback), `PHASE1-TOKENS.md`,
  `PHASE2-PLAN.md`, `CHANGELOG.md` (every change, newest first — read this first).

## Done today (all committed + pushed)
Phase-1 Borderline tokens; `:root` retheme (red/black/Inter gone); hero parallax;
symmetric hero scrim; Properties section + 9 HD photos; review portraits (SVG avatars
deleted); ticker spool + hover pills; engineer chat icon (28/32px); burger right +
animated drawer sheet; full-width category bar + region docked right; duplicate logo
removed; working search-by-name; drawer secondary links; compact region ≤680px;
footer credit line removed; HD swaps (intro + 8 designs); image `?v=` cache-busting
(current tag `?v=20261014o` — bump letter on every CSS/JS/img-ref change).

## Open / suspected (NOT code bugs — verify with user first)
1. User's live screenshot showed BROWN backgrounds — shipped CSS has zero brown
   (verified by fetching live stylesheet). Suspect: dark-mode browser extension.
   Test: incognito comparison. Same suspect for earlier "missing chat icon" reports
   (proven rendering in Playwright at 375/440px + screenshots).
2. Old Who-we-are photo on live = same-filename cache; fixed via versioned image
   URLs (commit `1b4f10f`, pushed). Confirm with user it resolved after deploy.
3. `prop-land-2` (patchwork aerial) weakest photo — replaceable if user agrees.
4. 6 prop/portrait photos credit "contributor (name unlisted)" + page URL — backfill
   names if an Unsplash API key appears. `design-*.svg` files may be orphaned —
   verify usage, then delete.

## Still queued from original plan
- Step 2: light typography (DM Sans 300 headings, drop 700/800, Lato nav).
- Step 3: button hover polish + fix white-on-`#597C8E` = 4.47 contrast (use `--primary-deep`).
- Step 4: collapse 4 header bars → one sticky bar (drawer/dropdown for categories).
- Step 5 leftovers: contact config block (TODO), rename `assets/apex logo.jpg` →
  `apex-logo.jpg`, counter no-JS final values, dead-link pass.

## How to verify (established pattern)
- `node --check js/main.js`; Python Playwright (installed) + Chromium for
  screenshots/DOM checks at 1280/768/375; scripts live in Temp `opencode/` (not repo).
- Small commits, CHANGELOG entry each, push `main` to publish. Never copy code/text/
  images from reference sites (Borderline tokens are facts-only). No API keys or
  passwords from user, ever.
