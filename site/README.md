# Lemovals

A local-business website for **Lemovals** — a removal company based in Crosby / Waterloo, run by Leigh Dacosta Greaves. Built as part of a research-driven SKILLfc workflow (see `../SKILLfc.md`).

## What's here

```
site/
├── index.html                     — home
├── services/
│   ├── house-and-flat-moves.html
│   ├── storage-runs.html
│   ├── clearances.html
│   └── appliance-removals.html
├── areas/
│   ├── index.html                 — areas hub
│   ├── l22-waterloo.html
│   ├── l23-crosby.html
│   ├── l30-bootle.html
│   ├── l20-bootle.html
│   ├── l5-kirkdale.html
│   └── l4-walton.html
├── about.html
├── reviews.html
├── contact.html
├── 404.html
├── css/main.css                   — design system, components, utilities
├── js/main.js                     — nav, reveal, count-up, quote form, scroll-stop
├── assets/
│   ├── logo.svg                   — placeholder word-mark
│   └── frames/                    — reserved for SKILL3D frame sequence
├── robots.txt
└── sitemap.xml
```

## Run locally

```bash
cd site
python3 -m http.server 8080
open http://localhost:8080
```

Anything served via HTTP works (Python, `npx serve`, `caddy file-server`, etc.). Viewing via `file://` breaks the fetches for frames and the Google Fonts preconnect hints.

## Design system

- **Colour:** trust blue `#0b3d91` · deep navy `#071f4a` · sky `#3d7be8` · soft `#e8eef7` · white
- **Type:** Space Grotesk (display) · Archivo (body) · JetBrains Mono (numerals)
- **Motion:** vanilla JS + CSS transitions. GSAP/ScrollTrigger can be layered in if richer scroll choreography is wanted. `prefers-reduced-motion` respected throughout.
- **Accessibility:** WCAG AA on primary colour pairings, keyboard-navigable nav and menus, visible focus rings, `aria-current` on active nav, `aria-expanded` on mobile toggle.

## The scroll-stop hero

A placeholder is wired in on `index.html` — look for `<!-- 3D SCROLL ASSET HERE -->` comments.

To drop in the real scroll-scrubbed hero video:

1. Generate the asset using `../SKILLassets.md` (nano banana 2 + seedance). Target: 3–6s, first frame on white, single-take focal transformation.
2. Extract frames with FFmpeg into `site/assets/frames/` (see `SKILL3D.md` for exact commands).
3. Replace the placeholder gradient/canvas inside `.scroll-stop-canvas` with the frame-rendering canvas code from `SKILL3D.md`.
4. Keep the annotation cards — they're already positioned and will snap-activate as scroll progress advances.

## Deployment

### Vercel

```bash
cd site
npx vercel
```

### Netlify

Drag the `site/` folder to the Netlify dashboard, or:

```bash
cd site
npx netlify deploy --prod --dir=.
```

### Any static host

All files in `site/` are static — no build step. Upload via FTP/SFTP/S3/whatever.

## Before going live — checklist

- [ ] Confirm trading name and registered address — currently "Leigh Dacosta Greaves trading as Lemovals, Crosby, L23"
- [ ] Confirm insurer (Goods-in-Transit + Public Liability) and add cover limits to footer + About
- [ ] Confirm Environment Agency waste-carrier registration number (required for clearance service)
- [ ] Swap `/assets/logo.svg` for the real Lemovals logo if one exists
- [ ] Replace placeholder reviews on `/reviews.html` with real Facebook pulls
- [ ] Update `hello@lemovals.co.uk` everywhere to the real email once set up
- [ ] Update `https://lemovals.co.uk/` canonical + OG URLs if different domain
- [ ] Produce and drop in the real scroll-stop hero video (see above)
- [ ] Add a `/og-home.jpg` (1200×630) for social previews
- [ ] Submit `sitemap.xml` to Google Search Console

## Relevant project files (parent directory)

- `../SKILLfc.md` — the 6-phase website-intelligence workflow this site was built under
- `../SKILL3D.md` — the scroll-driven-video build skill that wires the hero asset
- `../SKILLassets.md` — the 3D-asset-generator skill (nano banana 2 + seedance) that produces the hero video
- `../research/01-client-brand.md` — N/A (skipped; greenfield build)
- `../research/02-competitor-analysis.md` — Phase 2 research
- `../research/03-build-brief.md` — the approved build brief this site implements
- `../competitive-analysis.html` — the client-facing competitive report

---

Built April 2026 · blue &amp; white · Crosby, Merseyside.
