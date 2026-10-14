# PHASE 2 — plan: apply Borderline look to APEX (Summit layout kept)

## Audit (current site @ `18788ea`)
1. Colors: `--red #E11B23/#B8141C/#8E0F16/#FF4A57` + blacks/greys; `red` ×66, `700/800` ×38 — all must go.
2. Fonts: Inter 400–800 (Google) only; no DM Sans/Montserrat/Lato.
3. Header: 4 stacked bars (`.brandbar`, `.utilnav`, `header`, category nav); 9× `#top` + 18× `#designs` dead links.
4. Assets/config: `assets/apex logo.jpg` (space) ×4 refs; phone `+61800000000`, emails `hello@`/`you@`, `WA 6121` placeholders.
5. JS (`js/main.js` 24KB): designs data + counters — counters need no-JS final-value fallback.
6. Chat button icon broken (2 `chat` refs); hero/cards copy is Summit-derived, must be rewritten originally.

## Steps (one small commit each: `phase2: <n> - <what>`)
1. `:root` tokens from PHASE1 + replace hardcoded colors/fonts; delete all red. Verify: `grep -ci red css` → 0 (non-comment), pages render light `#F3EEEA`/dark `#2F4156`.
2. Typography: DM Sans 300 headings + Montserrat body (Google Fonts; fallback Poppins 300/400/500); drop 700/800 headings. Verify: no `font-weight: 7/800` on headings.
3. Buttons: keep Summit padding scale, Borderline radius `10px` + filled `#597C8E`/outline pair in hero; `:hover` states; WCAG AA text/bg contrast.
4. Header → ONE sticky bar (logo, links, "Book a consultation", phone, search + hamburger); category nav + region selector into drawer/dropdown; fix Tiny Homes overlap.
5. Fixes: chat-bubble SVG; original hero/cards/appointment copy; dead links → real sections or `TODO`; contact config block (`TODO`); rename logo → `apex-logo.jpg`; counters show final values without JS.
6. User extras: none supplied (`[PASTE HERE]` empty) — skipped unless provided.

## Test matrix per step
- Viewports 375 / 768 / 1280px (DevTools or `python -m http.server` + resize); static only, GitHub Pages safe (no build, no backend).
- DONE = CHANGELOG entry + `git log` shows step commit + rollback ref intact.
