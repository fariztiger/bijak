# BIJAK-WEB-001 — Commercial Readiness Recommendations

**Mission:** BIJAK Digital Experience & Product Discovery Platform · **Date:** 2026-11-25

## 1. Current commercial posture

The website prototype is **functionally complete and honest**, but commercially it is in a deliberate **pre-activation** state:

- ✅ All content, products, samples and CTAs are real and verified.
- ✅ The interactive experience lets prospects try the methodology before any commercial step.
- ✅ Every conversion pathway resolves to a legitimate action (free activity, free sample, enquiry).
- ⛔ **No live payment** — nothing is sold or confirmed on the site.
- ⛔ **No public deployment** — the site runs as a local preview pending founder authorization.

This is intentional: mission governance requires founder authorization before public deploy, payments, or confidential publication. The recommendations below define the steps to reach a revenue-ready state.

## 2. To activate revenue (priority order)

### 2.1 Payment infrastructure (highest priority)
1. **Select a licensed Malaysian payment gateway** supporting: Dual Signal, FPX, and major e-wallets (GrabPay, Touch n Go eWallet, Boost).
2. **Define pricing** for the Vol 01 quartet (Warna, InkSaving, BukuJawapan, PanduanGuru). *No prices are invented on the site — they must be set by the business before launch.*
3. **Wire the "Get Your BIJAK Workbook" CTA** from the enquiry form to a real checkout once approved.
4. **Digital delivery** — generate one-time access keys for PDF download, or integrate **STRATA ContentVault** for registered-user access to purchased materials.
5. **Physical delivery** — integrate courier/registered-post fulfillment for printed workbooks.

### 2.2 Public deployment
1. Founder authorization for public launch.
2. Deploy the static site to a static host (see deployment doc — no build step required).
3. Add HTTPS, a privacy/cookie policy, and (optionally) privacy-compliant analytics.

### 2.3 Enquiry backend
1. Add a server endpoint to persist enquiries (with server-side validation + rate limiting).
2. Assign ownership of enquiry responses (parents/teachers/institutions/partners).
3. Keep data collection minimal and transparent; never collect children's data.

## 3. Product readiness for commercialization

| Product | Status | Commercial note |
|---|---|---|
| BIJAK Jilid 01 — Warna Penuh | ✅ Complete, verified | Core SKU for parents/colour-printing classes |
| BIJAK Jilid 01 — InkSaving | ✅ Complete, verified | Core SKU for tuition centres/schools |
| Buku Jawapan | ✅ Complete, verified | Companion SKU (answers kept separate) |
| Panduan Guru & Ibu Bapa | ✅ Complete, verified | Value-add companion; supports adoption |
| Volume 02–05 | ⛔ Not complete | Must NOT be sold or presented as available |
| Colony 02 PoC | ⛔ Not publication-verified | Do not showcase until readiness verified |

**Recommendation:** launch commercialization with the verified Vol 01 quartet only. Extend the product architecture (already data-driven) when Volume 02 is verified.

## 4. Channel & audience commercial strategy

- **Direct-to-parent:** free activity → free sample → workbook purchase. Lowest friction; the lab is the top-of-funnel hook.
- **Teachers / tuition centres:** the InkSaving edition + teacher guide is the value proposition; target with school-package enquiries.
- **Schools / institutions:** bulk/institutional enquiry pathway; provide quotes and sample packs.
- **Distribution partners:** the partner enquiry route; prepare a distribution agreement and margin structure before activation.

## 5. Marketing & conversion framework (documented for handover)

The six-stage journey (Hook → Connection → Discovery → Experience → Trust → Conversion) is the marketing framework. Reusable elements:

1. **Value proposition** — "Kukuhkan pemahaman, bukan hanya hafalan" (Strengthen understanding, not just memorisation).
2. **Experience-first funnel** — the free 4M lab + free sample are the primary acquisition assets.
3. **Audience-segmented CTAs** — every audience has a matching, specific action.
4. **Honesty as a trust asset** — the research-honesty box, explicit scope notes (Vols 02–05 unavailable), and payment-boundary note differentiate the brand and prevent over-claiming.
5. **Progressive commitment** — free → sample → product → enquiry, never asking more than the visitor's comfort.

## 6. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Selling before payment is live | Keep enquiry-only; no simulated transactions |
| Presenting unfinished volumes | Explicit scope note; only verified products showcased |
| Over-claiming learning outcomes | Honesty box; no outcome/testimonial/validation claims |
| Children's data exposure | No child data collection; minimal adult enquiry data |
| Content leakage of paid workbooks | Selected sample pages only; watermarked sample PDF |
| Brand dilution across editions | Single palette/typography from the publishing engine |

## 7. Readiness checklist before launch

- [ ] Founder authorization for public deploy + payment activation
- [ ] Prices defined and approved
- [ ] Payment gateway + delivery integration live (or enquiry-only maintained)
- [ ] Enquiry backend live with ownership
- [ ] Privacy/cookie policy published
- [ ] Sentinel verification passed
- [ ] Human visual pass on desktop + mobile
- [ ] Vol 02+ not referenced as available
- [ ] Sealed baseline verified unchanged

**Bottom line:** the website is commercially *structurally* ready — every conversion pathway works honestly — but is deliberately held in pre-activation until the founder authorizes payment and public deployment. The plan above is the shortest path to revenue.
