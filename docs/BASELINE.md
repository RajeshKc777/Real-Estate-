# BASELINE — pre-Phase-2 snapshot (2026-10-14)

## Git refs (source of truth for rollback)
- `main` HEAD: `18788ea` — "chore: snapshot footer photo credits (pre-Phase-2 baseline)"
- Prior: `df30daf` (APEX rebrand), `d09c720` (mobile fixes), `97b3e3c`, `67b3e3c`
- Tag: `baseline/pre-phase2` → commit `18788ea` (annotated tag object `ed9307a`)
- Work branch: `phase2/borderline-theme` (all retheme commits go here; `main` untouched)
- Env note: Windows, `core.autocrlf=true` (expect LF→CRLF warnings on checkout; harmless)

## SHA-256 manifest (working tree at `18788ea`, before docs/)
- `9f12d6ea7417b3a57b842aa7c85ee59d5ef3835f87d1cc408ce203e3be0e27c5`  index.html (24975 B)
- `7d60aadabd2b76d76a6d0794792c07b68f9a77d4ef75404daae9dfc2d2b117bc`  css/styles.css (43359 B)
- `e81b39b29a5af2c22a8221084ff606f62e63e693fd2ffe2ad0ee313f90a8a3a2`  js/main.js (24102 B)
- `140c8a309b36f1421070df7a9a92526d7938f6ec80dc81a68260a1e4a03cfca2`  CREDITS.md (1977 B)
- `142127b353353bbb92e8729f018778323b6534d8dbc753ba400ab9cab331c3bc`  package.json (303 B)
- `dafaaca3174cc5b3c5f22001fdcc3b1be62b2600844edefac920b865b426af6f`  package-lock.json (20123 B)
- `4d56952b0fb13bf8f9b6c13a6d4c34a075bac3af447636a1df4335d7576e2f97`  .gitignore (14 B)
- `13c88c0d16b17f7c6705aefd7efdb788341318f1f4352c4c53ed3682def967ff`  fetch-photos.js (4872 B)
- `d8856b8dcadd6724aade9705b895452d05c47927af13195c30430ca45db986b1`  gen-images.js (19711 B)
- assets/ on disk (selected; full listing verified 2026-10-14):
  - `a8d8eedb782e2ba3ee1afea63236656e37104b15ee29317ad6b98618b9e0aa1b`  assets/apex logo.jpg (9199 B) — TO RENAME to `apex-logo.jpg` in Phase 2
  - `4fab26fdaa72b3e2df46efad9671b112aa1c84838c2a6391f9b1`  assets/hero.mp4 (44030640 B) — large binary, keep as-is
  - hero/design/display/split JPG+SVG sets + `logo-mark.svg`, `pattern.svg`, portraits, `cta-banner.*` (hashes recorded in session log; re-run `manifest.py` to re-verify)

## Rollback recipes (pick one)
1. Discard uncommitted work on branch: `git stash push -m "<reason>"` or `git checkout -- <file>`
2. Reset branch to baseline: `git checkout phase2/borderline-theme; git reset --hard baseline/pre-phase2`
3. Abandon retheme entirely: `git checkout main` (still @ `18788ea`); optional `git branch -D phase2/borderline-theme`
4. Verify integrity after restore: `git status --short` empty + `sha256sum` matches manifest above.

## Pre-existing uncommitted state (already preserved)
- At session start the tree was dirty (footer Unsplash photo-credit block, +13/−4 lines in `index.html` + `css/styles.css`). Committed as `18788ea` before tagging — nothing lost.
