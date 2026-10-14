# PHASE 1 — Borderline design tokens (extracted 2026-10-14, verified from live HTML/CSS)

Method: fetched `https://borderlineplumbing.com.au/` HTML (inline `:root` + 7 color schemes)
+ `cdn/shop/t/2/assets/theme.css`. No live-browser computed styles — see UNVERIFIED.
Rule: values are facts for re-implementation, NOT copied code.

## Colors (RGB → HEX)
- Light page bg (scheme-1): `243 238 234` → `#F3EEEA`
- Dark bg footer (scheme-7): `47 65 86` → `#2F4156`
- Mid-blue bg (scheme-4): `89 124 142` → `#597C8E`
- Pale icy bg (scheme-5): `199 217 228` → `#C7D9E4`
- Grey band (scheme-6): `178 178 176` → `#B2B2B0`
- Text on light: `#2F4156` | on dark/blue: `#FFFFFF` | muted: `rgb(text / .6)`
- Primary button (light): fill `#597C8E`, text `#FFFFFF`; on blue bg: fill `#F3EEEA`, text `#597C8E`
- Outline button: `transparent` fill, border+text = scheme primary (e.g. `#597C8E` on light)
- Surfaces (secondary): s1 `#FFFFFF`, s4 `#2F4156`, s7 `#597C8E`, s2 `#F3EEEA`
- Borders: s1 `#DFDDDB`, s2 `#EAECEE`, s4 `#6A8999`, s5 `#B8CAD6`, s7 `#445467`
- Header: scheme-1 (`#F3EEEA`/`#2F4156`), transparent over hero (text `#FFFFFF`), `position:sticky; top:0`

## Fonts (Shopify CDN `//borderlineplumbing.com.au/cdn/fonts/…`)
- Headings `DM Sans 300`, ls `-0.01em`, lh `0.9`, transform none; H1 `clamp(3rem→5.75rem)×0.9`, H2 `×0.9 (2.5→4.75rem)`, H3 `×0.9 (2→3.5rem)`
- Body `Montserrat 400` (500 med/600 bold), lh `1.4`, ls `0`; base `0.8125rem→0.875rem` ≥700px
- Nav `.subheading` `Lato 400 uppercase`, `0.6875rem→0.75rem`
- Buttons `Montserrat 400`, `0.8125rem→0.875rem`; padding `.75rem 1.5rem`; radius `0.625rem`; `transition: all .2s ease-in-out`

## Header structure
One sticky bar: logo (95px→100px) | primary nav Home/About/Services/Projects/Work With Us/Contact (≥1000px) | search + hamburger; mobile `<header-menu-drawer>` (scheme-1, H4 links + social). No phone/CTA in header.

## Screenshot cross-check (user values vs extracted — USE EXTRACTED)
- `bg #271b11` → NOT in CSS (likely hero photo brown). Use `#F3EEEA` / `#2F4156`.
- `text #b8d0e5` → NOT in CSS (likely photo). Use `#2F4156` / `#FFFFFF`; closest token `#C7D9E4`.
- `primary #456677` → close to `#597C8E` (likely darkened/overlay state). Use `#597C8E`.
- `outline #696154/#aba293` → NOT in CSS. Use scheme-primary outline pattern above.

## UNVERIFIED (needs user paste of computed styles if pixel-perfect hero wanted)
Live `getComputedStyle` (hero H1/button over video), `:hover` colors, `--page-background` (referenced by `body{}` but never defined in served CSS), sticky-scroll behavior.
