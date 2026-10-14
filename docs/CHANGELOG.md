# CHANGELOG (newest first; branch `phase2/borderline-theme` unless noted)

## 2026-10-14 — fix: cache-busted CSS/JS URLs (stale main.js hid property cards)
- What: `css/styles.css?v=20261014c`, `js/main.js?v=20261014c`. Bump the letter on every future CSS/JS change.
- Why: user's browser served fresh HTML with cached pre-properties `main.js` → empty `#propGrid`, no errors. Versioned URLs force refetch.
- Files: `index.html`.
- Verification: static string check only; user to confirm cards after one Ctrl+F5.

## 2026-10-14 — phase2 extra: properties section + 9 HD photos
- What: new `#properties` section (after display homes): filter chips All/Completed/Under construction/New sites + 9 cards (status flag, suburb, detail, enquire link) reusing `.card` styles; `properties` data + dedicated filter render in `main.js` (separate from designs `state`, no `data-group` clash); nav + footer links; 9 Unsplash HD photos (1600px, 247–832KB) in `assets/prop-{done,build,land}-{1..3}.jpg`; credits in `CREDITS.md` + footer.
- Why: user-requested property showcase with real HD mockup photos.
- Files: `index.html`, `css/styles.css`, `js/main.js`, `CREDITS.md`, 9 new assets.
- Verification: `node --check` clean; Playwright @1280px — 9 cards render, build filter narrows to 3, images load at natural 1600px, 0 errors; section screenshot reviewed (all photos topical).
- Notes: 6 photos credit "Unsplash contributor (name unlisted)" with photo-page URL — backfill names when API key available; `prop-land-2` (patchwork aerial) weakest match, replaceable; listing names/details are mock content.

## 2026-10-14 — phase2 extra: hero scrim softened + symmetric left/right
- What: `.hero::after` middle layer was `96deg` 0.88→0.04 (dark curtain on left); now `90deg` 0.50 → 0.22 center → 0.50 (equal sides); top/bottom layers eased 0.50→0.45, 0.82→0.75, 0.55→0.45.
- Why: user asked why left was dark, then approved soften + equal sides.
- Files: `css/styles.css`.
- Verification: headless-Chrome shot @1280px — photo visible edge-to-edge, no side curtain; pixel-sampled contrast vs white: title band left 13.2, right 11.7, mid-center 5.6 (all pass AA; residual L/R delta is photo content, overlay symmetric by construction).

## 2026-10-14 — phase2 extra: hero parallax (media + content, video included)
- What: `.hero__media` bleeds ±15% and drifts down with scroll (`--px` 0→15 set by rAF-throttled passive scroll listener); `.hero__inner` rises gently and fades. Transform sits on the media container so img and video parallax together; Ken Burns zoom untouched. Skipped entirely under `prefers-reduced-motion`; no work when hero off-screen.
- Why: user-requested parallax; verified see-first via Playwright layout pass.
- Files: `js/main.js`, `css/styles.css`.
- Verification: Playwright Chromium @1280px scrolled 380px — `--px 3.23`, media `translateY(+28.9px)`, content opacity 0.87, 0 JS errors; reduced-motion run — no `--px`, identity transform; mid-scroll screenshot clean (no edge gaps).
- UI problems found in the same pass (for later steps): arrows overlap title/lead on 375px; counters read 0 when JS slow (fix = bake final values into HTML, step 5); chat widget covers a stat label on 375px; hero has 1 slide so arrows/dots are vestigial; header stack is 232px @1280 / ~317px @375 (step 4).

## 2026-10-14 — phase2 step 1: Borderline tokens, red/black/Inter removed
- What: new `:root` (`--primary #597C8E`, `--primary-deep #456677`, `--ink #2F4156`, `--paper #F3EEEA`, `--mist #C7D9E4`, `--font-body Montserrat/Poppins`, `--font-head DM Sans/Poppins`, `--danger/--ok` functional only); migrated all usages (`--red`→primary 47, `--black`→ink 33, `--red-light`→mist 9, `--grey-600`→ink 13, `rgba(225,27,35`→slate 4); `.btn--red`→`.btn--primary`, `.btn--black`→`.btn--dark` (CSS+HTML); headings use DM Sans; body/paper header; pillars→mist, stories→white, slides→paper sections; Google Fonts link swapped (DM Sans/Montserrat/Lato/Poppins, Inter gone).
- Why: PLAN step 1 — token foundation; layout/weights/buttons untouched for later steps.
- Files: `css/styles.css`, `index.html`.
- Verification: static checks pass (0 old tokens, braces 398/398, btn classes consistent, Inter gone); REA headless-Chrome render @1280px evidence `ev_e9a8ceb6…` — page loads, 0 page errors, hero + 10 design + 3 display + 6 FAQ + 3 slides rendered, new fonts/buttons in DOM. Contrast AA: ink/paper 9.06, white/ink 10.44, mist/ink 7.20, white/primary-deep 6.14.
- KNOWN ISSUE → step 3: resting filled button white on `#597C8E` = 4.47 (0.03 under AA 4.5; hover `--primary-deep` passes 6.14).
- Not verified: 375/768px viewports (no layout change this step; matrix runs at step 4), real-device fonts (Google Fonts needs network).
- Docs: [[PHASE1-TOKENS]] [[PHASE2-PLAN]]

## 2026-10-14 — docs: baseline + Phase-1/2 tracking (step 0)
- What: safety net + machine-readable docs so any model/human can continue or roll back.
- Why: user requested tracked, lossless workflow before retheme.
- Commits: `18788ea` on `main` (snapshot of dirty footer-credit work); tag `baseline/pre-phase2`; branch `phase2/borderline-theme`.
- Files: `docs/00-INDEX.md`, `docs/BASELINE.md`, `docs/PHASE1-TOKENS.md`, `docs/PHASE2-PLAN.md`, `docs/CHANGELOG.md` (this file).
- Verification: `git status` clean at snapshot; SHA-256 manifest in BASELINE.md; rollback recipes tested by inspection (no destructive command run).
- Docs: [[00-INDEX]] [[BASELINE]] [[PHASE1-TOKENS]] [[PHASE2-PLAN]]

## 2026-10-14 — chore: snapshot footer photo credits (pre-Phase-2 baseline) [`18788ea`, on `main`]
- What: committed pre-existing dirty work (+13/−4): footer Unsplash credit block (`index.html`) + `.footer__credit` styles (`css/styles.css`).
- Why: preserve user work before tagging baseline; nothing lost.
- Verification: `git diff --stat` reviewed; tree clean after commit.
