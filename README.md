# BIJAK-WEB-001 — BIJAK Digital Experience & Product Discovery Platform

**Mission:** BIJAK-WEB-001 · **Colony:** 03 · **Phase:** GENESIS · **Date:** 2026-11-25
**Authorization:** Founder · **Status:** Functional prototype complete (local preview — NOT publicly deployed)

An interactive, bilingual (Bahasa Melayu / English) marketing & product-discovery website for **BIJAK 4M**, the four-stage mathematics learning methodology developed in the sealed Volume 01 baseline.

## What it is

A single-page, fully-static website that lets parents, teachers, tuition centres, schools, institutions and distributors **understand and experience** the BIJAK 4M approach — Memahami (Understand), Memvisualisasi (Visualize), Mengira (Calculate), Menguasai (Master) — before deciding whether to buy or enquire.

## Quick start (local preview)

```bash
cd /home/user/bijak-web
python3 -m http.server 8080 --bind 0.0.0.0
# open http://localhost:8080
```

No build step. No framework. Pure HTML/CSS/JS.

## Structure

```
index.html                  single page, all sections (13 sections)
assets/css/style.css        full design system (sealed Vol 01 palette)
assets/js/i18n.js           MS/EN bilingual dictionary (single source of truth)
assets/js/lab4m.js          interactive 4M lab engine (M1–M4 + mastery maze)
assets/fonts/               self-hosted Comic Neue
assets/img/                 mascot, hero, spot illustrations, product covers, sample pages
samples/BIJAK_Sample_Vol01.pdf   free downloadable sample (7 selected pages, watermarked)
tools/prep_assets.py        regenerates all web assets from the sealed baseline
tests/test_site.js          jsdom test suite (50 assertions)
docs/                       concept, journey, deployment, tests, commercial readiness
```

## Key features

- **Journey:** Hook → Connection → Discovery → Experience → Trust → Conversion.
- **Interactive 4M lab:** real module-style activities with manipulatives, immediate feedback, mascot coaching, and a single-solution 7-times-table maze.
- **Product showcase:** verified Vol 01 quartet with specs, comparison, and a flip-through sample viewer.
- **Bilingual:** one-click MS/EN switch across the entire site.
- **Accessible:** semantic HTML, ARIA, focus styles, skip link, reduced-motion support.
- **Honest:** no invented prices, sales figures, testimonials, or scientific-validation claims; enquiry-only conversion until payment is authorized.

## Testing

```bash
npm install --no-save jsdom
node tests/test_site.js
```

**Result: 50 passed, 0 failed.** Math accuracy verified across 160 random questions (0 errors).

## Governance

- Separate workspace — the sealed baseline `/home/user/bijak-4m` is **read-only** and unchanged (md5-verified).
- **No public deploy, no live payments, no confidential publication** without founder authorization.
- Submitted for independent Sentinel verification before harvest.

See `docs/` for the full deliverables.
