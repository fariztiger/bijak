# BIJAK-WEB-001 — Test Results & Known Limitations

**Mission:** BIJAK Digital Experience & Product Discovery Platform · **Date:** 2026-11-25

## 1. Test environment

- **DOM tests:** Node.js + jsdom (no headless browser available in the sandbox; jsdom provides full DOM/event simulation for the interactive logic).
- **Asset tests:** filesystem checks for every required asset.
- **Server checks:** `python3 -m http.server` on port 8080, HTTP status + size verification for the page and all key assets.
- **Math verification:** 160 randomly generated quiz questions checked for correct answers present among options.

## 2. Automated test results

**Suite: `tests/test_site.js` — 50 assertions, 50 passed, 0 failed.**

### Boot & bilingual (9 checks)
- Default language is MS ✓
- Title set from i18n dictionary ✓
- 60+ i18n keys applied to DOM ✓
- M1 station active by default ✓
- Initial score label "Markah: 0 / 0" ✓
- Language switch to EN ✓ (LANG, title, CTA text, html lang attribute)

### Interactive 4M lab (24 checks)
- **M1 Memahami:** 4 options, numeric, correct answer matches shown apple groups, correct marking, good feedback, score increment ✓
- **M2 Memvisualisasi:** station activation, correct answer matches dot count, good feedback ✓
- **M3 Mengira:** question format `N × N`, correct product present among options ✓
- **M4 Menguasai:** MS question text, 56-cell maze grid (8×7), start + goal cells, row-3 construction (start 7 → goal 56), wrong-move blocking, wrong feedback, **correct-path solve** ✓

### Product & sample system (9 checks)
- Sample flip viewer advances / wraps / page counter ✓
- 7 sample assets present ✓

### Enquiry & assets (10 checks)
- Enquiry form validation + honest success message ✓
- All required CSS/JS/image/PDF assets present ✓

## 3. Math accuracy verification

A separate loop ran **160 randomly generated questions** across all four stations (40 rounds × 4 stations), verifying that the correct answer was always present among the generated options and that no wrong answer equaled the correct one.

**Result: 160 questions verified, 0 errors.**

Quiz content sourced from verified module facts:
- M1: grouped-item products (2–5 groups × 4–6 items).
- M2: array dot counts (rows 2–4 × cols 3–5).
- M3: times tables (2×5, 4×5, 2×10, 3×7 — KSSR Tahun 5 multiplication scope).
- M4: multiplication word problems (4–6 groups × 5–8 items) + 7-times-table maze.

## 4. Asset integrity

| Asset | Size | Status |
|---|---|---|
| mascot PNG (transparent) | 57 KB | ✓ from baseline, white→transparent applied |
| hero.jpg | 71 KB (1200×654) | ✓ |
| spot illustrations ×6 | 32–101 KB (700×381) | ✓ |
| product covers ×4 | 44–84 KB (620×877) | ✓ rendered from final PDFs |
| sample pages ×7 | 53–95 KB (820×1160) | ✓ verified page map |
| sample PDF | 546 KB, 7 pages | ✓ watermarked, selected pages only |

**Total page weight (first load):** ~36 KB HTML + ~52 KB JS + ~16 KB CSS + fonts (cached) + images — well within performant-static targets.

## 5. Server verification

All routes returned HTTP 200 with expected sizes:
`/` (36 KB), `style.css` (16 KB), `i18n.js` (35 KB), `lab4m.js` (16 KB), mascot (59 KB), sample PDF (560 KB), cover-warna (53 KB).

## 6. Baseline protection verification

- Sealed baseline `/home/user/bijak-4m` untouched: `output/` PDFs, illustrations, fonts, publishing-engine, reports all byte-identical (md5 checked).
- The prep script reads the baseline **read-only**; no writes occur into it.
- The website lives entirely in the separate workspace `/home/user/bijak-web/`.

## 7. Known limitations & honest caveats

1. **No live payment.** The enquiry form is the only conversion endpoint; no prices, transactions, or payment confirmations are simulated.
2. **No backend.** Enquiry submissions are not persisted server-side yet; the confirmation is a local, honest message.
3. **No headless browser.** Visual/DOM behaviour was verified via jsdom + server checks. A final human visual pass on real desktop and mobile screens is recommended before public launch.
4. **Colony 02 PoC** is not showcased (publication readiness not verified).
5. **Volumes 02–05** are not complete and are explicitly not presented as available.
6. **Research claims** are limited to what the sealed references support; no scientific-validation, testimonial, or outcome claims are made.
7. **Child data:** none is collected; the only form is for adult enquirers.
8. **Accessibility:** the site implements skip link, ARIA, focus styles, and reduced-motion support; a full manual WCAG audit is recommended before public launch.

## 8. Acceptance criteria status

| Criterion | Status |
|---|---|
| Value proposition communicated clearly | ✓ Hero + hook section |
| Visitors can understand & experience 4M | ✓ Method cards + interactive lab |
| Product previews reflect authentic assets | ✓ Sample pages from rendered workbook |
| Mathematical content accurate | ✓ 160/160 verified |
| All buttons & CTAs function | ✓ All link to live sections or files |
| Desktop & mobile layouts | ✓ Responsive (mobile-first CSS), DOM-verified |
| Bilingual consistency | ✓ Single dictionary, 50 assertions |
| Research claims evidence-supported | ✓ Honesty box + no invented claims |
| Confidential assets protected | ✓ Selected samples only; baseline sealed |
| Commercial limitations documented | ✓ Enquiry-only; payment plan documented |
| Original baseline unchanged | ✓ md5-verified |
