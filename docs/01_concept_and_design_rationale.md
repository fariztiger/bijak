# BIJAK-WEB-001 — Website Concept & Design Rationale

**Mission:** BIJAK Digital Experience & Product Discovery Platform
**Colony:** 03 · **Date:** 2026-11-25 · **Status:** Prototype complete (local preview only — no public deploy)

## 1. Strategic intent

The mission is to transition BIJAK from *product development* to *product presentation, customer engagement and commercialization*. The website is not a brochure: it must let a visitor **understand and experience** the BIJAK 4M approach before deciding whether to buy or enquire. Every section exists to serve one of six journey stages:

**Hook → Connection → Discovery → Experience → Trust → Conversion**

## 2. Audience first

The site must be credible to two very different constituencies at once:

- **Parents and educators** who evaluate educational products on clarity, honesty and learning quality.
- **Tuition centres, schools, institutions and distributors** who evaluate on structure, scalability and commercial practicality.

The design therefore balances **child-friendly warmth** (illustrations, mascot, playful quiz UI) with **professional restraint** (editorial palette, generous whitespace, plain-language methodology). The mascot TIGER BIJAK is the friendly guide; the deep-green palette and editorial layout carry the credibility.

## 3. Design direction

### 3.1 Brand system (reused, not reinvented)

All visual tokens come from the sealed Vol 01 V2.0 publishing palette (`publishing-engine/editorial.py`), guaranteeing the website and the print products are one brand:

| Token | Colour | Usage |
|---|---|---|
| DEEP `#123F31` | deep green | headers, hero, dark bands |
| TEAL `#0E7C6B` | primary action | primary buttons, links |
| LEAF `#1F6F4A` | success states | correct answers |
| AMBER `#E8A317` / GOLD `#FFD23F` | warmth, CTAs | gold CTAs, highlights |
| CORAL `#E07A5F` | playful accent | M4 badge, warm cards |
| SKY `#7EC8E3` | M1 badge, cool tints | visualisation stage |
| MINT `#EAF4F1` / SAGE `#F0F7EF` | soft backgrounds | section bands |
| CREAM `#FFF8E7` / PAPER `#FFFDF4` | page background | content surfaces |

Typography reuses the Comic Neue family already embedded in the print products (self-hosted `assets/fonts/`, three weights) for headings and interactive copy; body text uses a system stack for readability and performance. No new fonts, no new palette — brand consistency is structural, not cosmetic.

### 3.2 Visual language

- **Rounded, soft, hand-drawn feel** — carries the illustrated-workbook identity into the interface.
- **Card-based modular grid** — each product, audience, stage and hook is a self-contained card so content reorganises cleanly on mobile.
- **The mascot as a functional character** — TIGER BIJAK appears as the lab coach and speaks via a speech bubble with live feedback (aria-live), making guidance a real feature, not decoration.
- **Progressive disclosure** — the lab reveals one stage at a time; the sample viewer flips one page at a time. No wall of content at once.

### 3.3 Animation philosophy

Animation exists to **teach or to guide**, never to decorate:

- The lab's reveal/correct feedback teaches (arrays light up, wrong paths are blocked).
- Scroll-reveal (`IntersectionObserver`) gently draws attention to sections.
- **Reduced-motion is fully supported**: `prefers-reduced-motion` media query, a manual toggle in the lab, and a `html.reduce-motion` class that kills all animation/transition. Interactive activities remain fully usable without animation.

## 4. Information architecture

```
Header (sticky): brand · nav · MS/EN toggle · sample CTA
├─ Hero            HOOK       value proposition + primary CTAs + trust chips
├─ Challenges      HOOK       4 genuine learning challenges we address
├─ Method          DISCOVERY  the 4M framework, one card per stage
├─ Research        DISCOVERY  8-step timeline: research → verified product
├─ 4M Lab          EXPERIENCE interactive M1–M4 activities + mastery maze
├─ Products        DISCOVERY  verified Vol 01 set with specs
├─ Sample Viewer   EXPERIENCE flip through selected sample pages
├─ Comparison      DISCOVERY  Warna vs InkSaving
├─ Audiences       CONVERSION four tailored pathways
├─ Strategy        CONVERSION the 6-stage journey (transparent to visitors)
├─ CTAs            CONVERSION five primary + five secondary
├─ Payments        CONVERSION proposed MY payment/delivery mechanisms
└─ Enquiry         CONVERSION minimal-data interest form
Footer             trust notes, links, honesty statement
```

## 5. Content honesty (non-negotiable)

The site makes only claims that are verifiable from the sealed baseline:

- **Implemented methodology** — the 4M framework, module structure, colour/ink editions, answer-book separation: all exist in V2.0.
- **Verified production quality** — every sample page is a rendered page from the actual workbook; the maze is the actual BFS single-solution maze; the lab content is a faithful adaptation of actual module activities.
- **Educational inspiration** — research references are presented as *approaches examined*, with a visible research-honesty box. **No** scientific-validation claims, no testimonials, no affiliations, no prices, no sales figures, no payment confirmations.
- **Scope honesty** — Volumes 02–05 are explicitly stated as not available; Colony 02 PoC is not showcased (not verified for publication readiness).

## 6. Technical approach

**Stack:** 100% static — vanilla HTML/CSS/JS, zero build step, zero framework runtime. This maximises:

- **Performance** — no framework bundle; the page is ~36 KB HTML + ~52 KB JS + ~16 KB CSS + local fonts.
- **Portability** — any static host (GitHub Pages, Netlify, Apache/nginx) can deploy it with no pipeline.
- **Accessibility** — semantic HTML, ARIA tabs/roles, focus-visible outlines, skip link, aria-live feedback.
- **SEO** — semantic headings, meta description, og tags, descriptive alt text on every image.

**Bilingual:** a single `I18N` dictionary drives both languages; switching re-renders all visible text, title/meta, and regenerates the lab's current activity. The dictionary is the single source of truth — adding a language means adding keys, not rewriting pages.

**Product architecture for future volumes:** products are rendered from a data-driven structure (cover + specs + sample pages). Adding Volume 02 means adding a product entry and sample assets — the layout, flip viewer and comparison table already generalise.

## 7. Protection & privacy

- Public previews are **deliberately selected sample pages only** — never full workbooks, answer banks or production sources.
- No personal data from children; the only form collects adult enquirer name/email/role/interest, with a visible privacy note.
- The enquiry form is a **front-end-only interest capture** — no payment is simulated and no confirmation of payment is shown. (See commercial readiness doc for the real payment plan.)
- Architecture is ready for future **STRATA ContentVault** integration: purchased materials would be served from controlled access, not from the public bundle.

## 8. Assumptions & dependencies

- Live payment infrastructure is not activated for this mission → honest enquiry pathways only.
- No public deployment is made; the prototype runs in a local preview for verification.
- The sealed baseline `/home/user/bijak-4m` is read-only reference and is byte-unchanged.
- Sentinel verification is required before any harvest/public deploy.
