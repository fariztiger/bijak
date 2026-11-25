# BIJAK-WEB-001 — Deployment & Maintenance Documentation

**Mission:** BIJAK Digital Experience & Product Discovery Platform · **Date:** 2026-11-25

## 1. Deployment status

**NOT deployed publicly.** The prototype runs as a local static preview (port 8080) for verification only. Public deployment requires **founder authorization** per mission governance. This document describes the trivially easy deployment path so it can be activated on approval.

## 2. What the site is

A **fully static website** — no server-side code, no build step, no framework runtime, no database.

```
bijak-web/
├── index.html              # single page, all sections
├── assets/
│   ├── css/style.css       # full design system
│   ├── js/i18n.js          # bilingual dictionary (MS/EN)
│   ├── js/lab4m.js         # interactive 4M lab engine
│   ├── fonts/              # Comic Neue (3 weights, self-hosted)
│   └── img/                # mascot, hero, spot illustrations, covers, sample pages
├── samples/
│   └── BIJAK_Sample_Vol01.pdf  # free downloadable sample (selected pages)
├── tools/
│   └── prep_assets.py      # regenerates all web assets from sealed baseline
├── tests/
│   └── test_site.js        # jsdom test suite (50 assertions)
├── docs/                   # this documentation
└── benchmark/ archive/     # records
```

## 3. How to deploy (approved rollout)

The site is static, so deployment is a file copy to any static host.

**Option A — plain static host (Apache/nginx):**
```bash
# from a clean checkout / archive of /home/user/bijak-web
rsync -av bijak-web/ /var/www/bijak/
# nginx: root /var/www/bijak; index index.html
```

**Option B — GitHub Pages / Netlify / Cloudflare Pages:**
- Push the repo, point the host at the repo root, enable "public" access.
- No build command; no environment variables needed.

**Option C — local verification only (current):**
```bash
cd /home/user/bijak-web
python3 -m http.server 8080 --bind 0.0.0.0
```

### Pre-deployment checklist (before public launch)
1. Founder authorization for public deploy confirmed.
2. Payment gateway / delivery integration approved (or keep enquiry-only).
3. Privacy/cookie policy reviewed (currently no cookies, no analytics, no tracking).
4. Sentinel verification passed.
5. Confirm no confidential/unfinished assets are present (only `assets/img/` sample JPGs and the watermarked sample PDF).
6. Confirm the sealed baseline `/home/user/bijak-4m` was never modified.

## 4. Asset regeneration

All images are derived from the **sealed Vol 01 baseline** by a single reproducible script:

```bash
pip install pymupdf
python3 tools/prep_assets.py
```

This script:
- regenerates the mascot (transparent, 480px),
- optimises hero + spot illustrations,
- renders product covers from the final PDFs,
- extracts the **verified sample page set** (p1, p8, p9, p10, p12, p63, p65),
- rebuilds the watermarked, compressed sample PDF (~546 KB, 7 pages).

It reads the baseline **read-only** and never writes into `/home/user/bijak-4m`.

**To add a future volume:** add cover images + sample pages to `assets/img/`, extend the product/showcase data in `index.html` and `i18n.js`. No layout changes required.

## 5. Content updates

- **Text (both languages):** edit `assets/js/i18n.js` (the `I18N` dictionary). Every visible string is keyed there. Adding a key + both translations makes it appear everywhere automatically.
- **Sample pages / covers:** re-run `prep_assets.py`, or place new JPGs in `assets/img/`.
- **Product specs:** edit the product cards and `spec.*` i18n keys in `index.html` + `i18n.js`.

## 6. Testing

```bash
npm install --no-save jsdom
node tests/test_site.js
```

The suite boots the page in jsdom, loads the scripts, and asserts on:
- boot state (language, title, i18n, default station),
- language switching (MS↔EN, title/meta/html-lang),
- each 4M quiz station (options, correct answers, feedback, scoring),
- the maze (56-cell grid, start/goal, wrong-move blocking, correct-path solve),
- the sample flip viewer,
- the enquiry form,
- asset presence.

**Target: 50 passed, 0 failed.** Re-run after any JS/i18n change.

## 7. Maintenance plan

- **Content:** reviewed by BIJAK Production before each release; new sample pages selected deliberately (never expose full workbooks or answer banks).
- **Accessibility:** keep focus styles, ARIA roles, skip link, reduced-motion support intact when editing; re-check after layout changes.
- **Performance:** images are pre-optimised (JPEG ≤101 KB, mascot PNG ≤57 KB). If adding new images, run the same optimisation (max width 820–1200px, JPEG q82).
- **Security:** the only data path is the enquiry form, which is front-end-only today. When wired to a backend, use server-side validation, rate limiting, and a privacy-compliant handler. Serve over HTTPS in production.
- **SEO:** keep meta description, og tags, and semantic headings current as content changes.

## 8. Known limitations

- **No live payment** — the enquiry form is the only conversion endpoint until approved.
- **No backend** — the enquiry form does not persist submissions yet; it shows an honest local confirmation.
- **Colony 02 PoC** is not showcased (publication readiness not verified).
- **Volumes 02–05** are not presented (not complete).
- Browser-based visual verification was done via DOM/asset tests and server checks; a final human visual pass on desktop + mobile is recommended before public launch.
