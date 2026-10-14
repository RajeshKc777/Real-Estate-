# CHANGELOG (newest first; branch `phase2/borderline-theme` unless noted)

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
