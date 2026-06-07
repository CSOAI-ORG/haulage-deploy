# WCAG 2.2 AAA — External Audit Plan (Move #21)

## Why AAA, not AA

UK + EU public-sector procurement requires AA minimum, **prefers AAA**. NHS, DfE, councils, transport
authorities all rank AAA-certified vendors higher in tenders. We already ship AA-grade (skip-to-content,
focus rings, ARIA labels, lang+dir attrs). The gap to AAA is small + opens £100k+ public-sector ARR.

## Audit firm shortlist

| Firm | Pricing | UK presence | AAA experience |
|---|---|---|---|
| **Axess Lab** (Sweden) | ~£2,500 for full SPA audit | ✓ | ✓ (gov + finance clients) |
| **Hassell Inclusion** (UK) | ~£3,500 | ✓ (London) | ✓ (GOV.UK, NHS) |
| **WebAIM** (US) | ~£3,000 | remote | ✓ |
| **TPGi** (US/UK) | ~£8,000 | ✓ | ✓ (enterprise-heavy, gold standard) |

**Recommended:** Hassell Inclusion — UK-based, NHS pedigree, sub-£4k.

## In-house pre-audit checklist (do this first, ~1 day)

### Contrast (AAA = 7:1 for body text, 4.5:1 for large)

- [ ] Run https://wave.webaim.org against every public route
- [ ] Verify body text on `bg-background` hits 7:1 against `text-foreground`
- [ ] High-contrast theme (Move #19) → already AAA
- [ ] Hover/focus states all 4.5:1+ against background

### Text resizing

- [ ] Page works at 200% browser zoom
- [ ] Page works with browser-level font-size override (try Firefox's "minimum font size")
- [ ] No fixed-pixel font sizes (already using Tailwind rem-based sizing ✓)

### Keyboard nav

- [ ] Every interactive element focusable in document order
- [ ] Skip-to-content link visible on first Tab (already shipped ✓)
- [ ] Focus indicator visible AND distinct from hover (already shipped ✓)
- [ ] No keyboard traps (test with all routes)
- [ ] Escape closes mobile menu (already shipped ✓)

### Screen reader

- [ ] Test with VoiceOver (macOS) on every page
- [ ] Test with NVDA (Windows) on key pages
- [ ] `aria-label` on icon-only buttons (already shipped ✓ on header)
- [ ] `aria-current="page"` on active nav links — **TODO**
- [ ] Landmark regions: `<header>`, `<nav>`, `<main>`, `<footer>` (already shipped ✓)
- [ ] `aria-live` regions for dynamic content (LoadingSkeleton, form errors)

### RTL (Arabic, Hebrew)

- [ ] Switch to AR → all layouts mirror correctly (already shipped via `<html dir>` ✓)
- [ ] Icons that imply direction (ArrowRight, ChevronRight) — **TODO** flip in RTL
- [ ] Charts + map should mirror

### Motion + animation

- [ ] Respect `prefers-reduced-motion` (already shipped on LoadingSkeleton ✓)
- [ ] No autoplay video / audio (we don't have any ✓)
- [ ] Animations are < 5 seconds OR have pause control

### Forms

- [ ] Every input has a `<label>` (Contact form ✓)
- [ ] Error messages associated with `aria-describedby` — **TODO** verify
- [ ] Required fields announced
- [ ] Onboarding wizard (Move #32) — already keyboard navigable, needs aria-live for step changes — **TODO**

### Language

- [ ] `<html lang>` updates per locale (already shipped ✓)
- [ ] `<html dir>` updates for RTL (already shipped ✓)
- [ ] Inline language switches (English brand names in Arabic body) — wrap in `<span lang="en">` — **TODO**

### Images

- [ ] All informative images have alt text — **AUDIT NEEDED**
- [ ] Decorative images have `alt=""` and `aria-hidden` (Hero ✓)
- [ ] Icons that convey state have text equivalent (catalogue 🟢/🟡 → audit)

## After firm engagement

1. Send them the URLs to audit (haulage.app/* + /legal/* + /onboarding + /case-studies + /partners)
2. Send i18n locale list (14)
3. Ask for: written report + remediation Trello board + accessibility statement template
4. Fix top-priority findings (typically 5-10 hours of dev)
5. Re-audit (free if within 4 weeks)
6. Publish at /accessibility statement + add to footer
7. List on https://www.accessibility-statements.org/

## Budget envelope

- £3,500 audit
- ~£1,500 dev remediation (~10h at typical contractor rate)
- £0 statement publishing (handle in-house)

**Total: ~£5,000 + 30 days calendar time → unlocks UK / EU public-sector tenders worth 10-100× that.**
