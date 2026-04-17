# Lemovals — Website Build Brief

**Client:** Lemovals — Leigh Dacosta Greaves, sole trader
**Base:** Crosby / Waterloo (north Liverpool, L22/L23 area)
**Market:** Merseyside primary; North West UK secondary
**Contact on Facebook:** facebook.com/p/Lemovals-removals-100063961604838 · 07479222460
**Date:** 2026-04-17
**Status:** ⚠️ AWAITING APPROVAL — hard stop before Phase 5 build

---

## 0. Context

Greenfield project — no existing website. Current trading presence is Facebook only. The brand's visual identity on Facebook is **blue + white**, which this brief adopts. Services on offer (from Facebook posts): house moves, flat moves, storage runs, house clearances, garage clearances, fridge / washing-machine removals.

The website's job is straightforward: give Leigh a credible, professional home on the web so callers have somewhere to vet him before dialling **07479222460**, and so the business can show up in local search for **"removals Crosby", "removals Waterloo", "removals L22/L23"** — the home-patch — with a secondary play at wider Liverpool and Merseyside terms.

Scroll-driven motion (via `SKILL3D.md` + `SKILLassets.md`) will be used to give the hero a memorable moment — most local removal sites are static WordPress templates.

---

## 1. Brand Identity

### 1.1 Positioning

**One-line positioning:** *Lemovals — removals you can trust in Crosby, Waterloo and across Merseyside.*
**Promise:** A proper local removal service. Clear quotes. Careful hands. Same bloke answers the phone.
**Tone:** Warm, local, plain-spoken, confident. Liverpool voice — no corporate gloss.

### 1.2 Colour palette — blue & white

Matches the Facebook presence. Tuned for web contrast and print-safe.

| Role | Hex | Usage |
|---|---|---|
| **Trust blue** (primary) | `#0b3d91` | Headings, nav, buttons, headline accents |
| **Deep navy** | `#071f4a` | Body text on white; dark sections |
| **Sky blue** | `#3d7be8` | Hover states, secondary accents, link colour |
| **Soft blue** | `#e8eef7` | Section backgrounds, card tints |
| **White** | `#ffffff` | Primary background |
| **Ink grey** | `#4a5568` | Secondary text |
| **Line grey** | `#e2e8f0` | Dividers, borders |

**Why this palette:** matches the Facebook page, signals reliability, works at a small size as a van-livery logo, keeps high contrast for accessibility (WCAG AA on every primary pairing).

### 1.3 Typography

| Role | Face | Usage |
|---|---|---|
| Display / headings | **Space Grotesk** (SKILL3D default) | H1–H2 |
| Body / UI | **Archivo** (SKILL3D default) | Paragraphs, buttons, forms |
| Numerals / stats | **JetBrains Mono** | Stat-bar figures, phone number |

Typography locked to the SKILL3D animation-creator default stack so the scroll-stop hero typography matches the rest of the site seamlessly.

### 1.4 Photography & asset direction

- Real van, real crew, real Crosby / Waterloo streets. Avoid stock.
- Natural light; daylight preferred over golden hour so the blue livery reads true.
- No posed clipboard shots.
- The scroll-driven hero asset will be generated via `SKILLassets.md` (nano banana 2 + seedance) — van-reveal archetype recommended. First frame: Lemovals-liveried van on white background. Final frame: same van parked on a Crosby terrace with boxes being loaded.

### 1.5 Logo placeholder

Word-mark in Space Grotesk (lowercase "lemovals" in trust blue). Placeholder SVG saved to `site/assets/logo.svg` — Leigh can swap in his existing Facebook mark later.

---

## 2. Site Architecture

### 2.1 Pages

| Page | Purpose | Primary CTA | Secondary CTA |
|---|---|---|---|
| **Home** | Brand introduction, scroll-stop hero, service snapshot, contact | Call 07479222460 | Request a quote |
| **Services / House & flat moves** | Core service page | Call | Quote form |
| **Services / Storage runs** | Short-term storage moves | Call | Quote form |
| **Services / House & garage clearances** | Clearances (bigger jobs) | Call | Quote form |
| **Services / Appliance removals** | Fridges, washing machines, single-item | Call | WhatsApp |
| **Areas we cover** | SEO hub — L22, L23, L30 first; wider Merseyside after | Call | — |
| **About Leigh** | Sole-trader story, Crosby base, trust page | Call | — |
| **Reviews** | Facebook reviews + Google | Call | — |
| **Contact** | Phone, message, Facebook link | Call | Map / directions |
| **404** | Fallback | Home | — |

Ship everything above in Phase 5.

### 2.2 Navigation

**Top nav:** `Services ▾` · `Areas` · `About` · `Reviews` · `Contact` · **[07479222460]** (button, tel: link)

**Services dropdown:** House & flat moves · Storage runs · House & garage clearances · Appliance removals.

**Footer:** Services list · Areas list · Phone + WhatsApp + Facebook · Registered name (Leigh Dacosta Greaves, trading as Lemovals) · Privacy · Terms · © Lemovals.

### 2.3 Homepage content hierarchy

1. **Hero** — headline, sub, phone button, quote-form button.
2. **Scroll-driven canvas** — SKILL3D-built scroll-stop section. Asset: van-reveal or box-stack (see `SKILLassets.md`). Annotation cards tell the story in 3–4 beats.
3. **Stat bar** — 4 figures (moves completed · years trading · ★ rating · areas covered). Real numbers, updated quarterly.
4. **Services grid** — 4 cards (house & flat · storage runs · clearances · appliance removals).
5. **Why Leigh / Why Lemovals** — 3 short pillars (local Crosby lad · same person answers the phone · careful with your stuff).
6. **Reviews strip** — 3 featured Facebook / Google reviews with names.
7. **Areas we cover** — postcode chips: L22, L23, L30, L20, L5, L4, plus wider Merseyside.
8. **Contact band** — phone large, Facebook link, map of the Crosby base.
9. **Footer.**

---

## 3. Content Framework

### 3.1 Homepage headline — three options

1. **"Crosby and Waterloo's local removal man."** — direct, local-first, human.
2. **"Moving home? Give Leigh a call."** — first-person-friendly, low-friction.
3. **"Proper removals, done proper, across Merseyside."** — Scouse-voice, memorable, confident.

**Recommended:** option 1. Anchors the brand to place (which is the biggest local-SEO asset) and makes it personal without being gimmicky. The animated hero handles the "memorable" work.

### 3.2 Value proposition

> **What:** House moves, flat moves, storage runs, house and garage clearances, and single-item appliance removals across Crosby, Waterloo, and the wider Merseyside area.
> **Who for:** Local families, tenants, landlords, downsizers — anyone who wants a proper bloke, not a faceless call-centre quote.
> **How to reach Leigh:** phone 07479222460 or message on Facebook.

### 3.3 Section-by-section copy direction

| Section | Tone | What to say |
|---|---|---|
| Hero | Warm, local | Headline + sub + phone + quote button |
| Scroll-stop | Minimal | 3–4 annotation cards: "Pack carefully." / "Load properly." / "Deliver on time." / "Done." |
| Stat bar | Specific | Real numbers — not "thousands" |
| Services | Scannable | 6–10 words per service, icon + "Learn more" |
| Why Leigh | 3 pillars, one sentence each | Local · personal · careful |
| Reviews | Real names | Pulled from Facebook and Google |
| Areas | SEO-relevant | Postcode chips with links to area pages |
| Contact | Single focus | Phone large, everything else secondary |

### 3.4 SEO keyword targets

**Priority 1 (home patch — these are the winnable ones):**
- `removals crosby` · `removals waterloo` · `removals l22` · `removals l23` · `removals bootle`
- `house clearance crosby` · `man and van waterloo`

**Priority 2 (wider reach):**
- `removals merseyside` · `removals sefton` · `removals liverpool north`
- `storage runs liverpool` · `appliance removal liverpool`

**Priority 3 (long-tail job types):**
- `fridge removal liverpool` · `washing machine removal crosby` · `garage clearance merseyside`

---

## 4. Conversion Mechanics

Kept simple — this is a sole-trader site, not a multi-branch operation.

- **Phone is the hero CTA.** 07479222460 lives in the top nav, repeated in hero, below every service, and in the footer.
- **Secondary CTA is a short quote form** (name · phone · from postcode · to postcode · date · notes). Submissions send Leigh an email + WhatsApp-equivalent SMS trigger.
- **WhatsApp / Facebook Message** as a third route for users already familiar with the Facebook presence.
- **Sticky mobile call button** — floating tel-link at the bottom of the viewport on narrow screens.

### Trust-signal checklist

- [ ] "Fully insured" statement (Goods in Transit + Public Liability) with limits
- [ ] Environment Agency waste-carrier licence number (if clearances are offered — check Leigh is registered; advise applying if not)
- [ ] Trading name + registered address in footer
- [ ] Privacy Policy + Cookie Policy pages
- [ ] GDPR-compliant contact form
- [ ] Schema markup: `LocalBusiness` with `hasMap`, `aggregateRating`, `areaServed` (L22, L23, L30, L20, L5, L4…)
- [ ] OG images per page

---

## 5. Technical Requirements

- **Stack:** HTML + CSS + vanilla JS.
- **Animation:** GSAP + ScrollTrigger for site-wide scroll animations; the hero scroll-stop uses the canvas/frame approach from `SKILL3D.md`.
- **Scroll-stop hero asset:** produced via `SKILLassets.md` using nano banana 2 + seedance. Output at `site/assets/hero.mp4`; FFmpeg extracts frames into `site/assets/frames/`.
- **Responsive:** mobile-first, breakpoints at 640 px and 960 px.
- **Performance target:** Lighthouse 90+ on all four categories.
- **Motion:** respect `prefers-reduced-motion` (scroll-stop degrades to a static first-frame hero image).
- **Accessibility:** WCAG AA across all primary colour pairings, keyboard-navigable, visible focus rings.
- **SEO:** one H1 per page, schema `LocalBusiness`, XML sitemap, robots.txt, OG + Twitter meta.
- **Deployment:** static files, Vercel or Netlify ready, README included.

---

## 6. What to AVOID (lessons from the Phase-2 competitor audit)

- ❌ Dense text-block service pages (Britannia Fleet's style) — use cards.
- ❌ Lorem-feel or AI-slop copy (Rocket Removals' mistake).
- ❌ Repeat stock imagery on service tiles (Keen Removals).
- ❌ Contact-form-as-only-CTA — always pair with phone.
- ❌ Overwhelming nav (Pickfords has too many top-level items for a sole trader).
- ❌ Expired SaaS trial banners in production (Gibbons slipped one through).
- ❌ Faceless corporate tone — Lemovals' edge is *that it's Leigh*.

---

## 7. Build Order (Phase 5)

1. Design tokens (blue/white palette), base CSS, typography.
2. Generate scroll-stop source asset via `SKILLassets.md` (Leigh to provide brand frames; regenerate until input contract passes).
3. Build hero + SKILL3D scroll-driven section + stat bar.
4. Services grid + four service pages.
5. Areas hub + initial postcode pages (L22, L23, L30, L20, L5, L4).
6. About, Reviews, Contact, 404.
7. Schema, sitemap, robots, OG images.
8. Lighthouse pass + accessibility pass + reduced-motion check.
9. README + deployment.
10. Phase-6 quality audit.

---

## ⚠️ APPROVAL CHECKPOINT

Confirm the following before I start Phase 5:

**Brand**
- [ ] Blue & white palette using the hex values in §1.2 — agree, or do you have exact hex values from Leigh's Facebook cover/logo that I should match?
- [ ] Space Grotesk + Archivo (matches SKILL3D default) — agree?
- [ ] Name stays "Lemovals" (lowercase word-mark) — confirm?

**Positioning**
- [ ] Headline option 1 (*"Crosby and Waterloo's local removal man."*) — agree, or pick 2 or 3?
- [ ] Crosby / Waterloo / Merseyside as the primary SEO footprint (not Liverpool-city-centre-first) — confirm?

**Scope**
- [ ] Ship Home + 4 service pages + Areas hub + 6 starter postcode pages + About + Reviews + Contact + 404 in Phase 5 — agree?
- [ ] Scroll-stop hero via SKILL3D + SKILLassets — confirm you'll generate the source MP4 using nano banana 2 + seedance, or do you want me to write out the exact prompts you should paste in?

**Details needed from Leigh**
- [ ] Trading name (confirm "Lemovals" is the legal / HMRC name, or is it sole-trader "Leigh Dacosta Greaves t/a Lemovals"?)
- [ ] Registered address for footer
- [ ] Goods-in-Transit + Public Liability insurer and cover limits
- [ ] Environment Agency waste-carrier registration number (required for clearance service)
- [ ] Any existing logo file / Facebook cover image to match exactly
- [ ] Email address for quote-form submissions

**Reply "approved" (with any changes) and I'll start the build.**
