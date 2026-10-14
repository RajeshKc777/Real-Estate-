# CHANGELOG (newest first; branch `phase2/borderline-theme` unless noted)

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
