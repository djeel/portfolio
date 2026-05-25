# djeel — Portfolio

Personal portfolio of djeel, a Product-minded Creative Developer based in France.

**Live:** [djeel.org](https://djeel.org) <!-- update with actual URL -->

## Stack

- **Framework** — Next.js 15 (App Router, SSG)
- **Language** — TypeScript
- **Styling** — CSS Modules + CSS Custom Properties
- **Animations** — GSAP (dynamic import, SSR-safe)
- **Smooth scroll** — Lenis
- **Fonts** — Syne (display) · JetBrains Mono (code labels)
- **Deployment** — Vercel

## Features

- Light / dark theme with zero flash on load (anti-FOUC inline script + `localStorage`)
- Editorial case study pages for each project (`/work/[slug]`)
- Smooth scroll via Lenis RAF loop
- GSAP stagger reveal on hero (race-condition safe)
- Fully static build — no server-side runtime required

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, anti-FOUC script
│   ├── page.tsx            # Homepage (Hero + SelectedWork + Approach)
│   ├── about/page.tsx      # About page
│   ├── contact/page.tsx    # Contact page
│   └── work/[slug]/        # Dynamic case study pages (SSG)
├── components/
│   ├── Nav.tsx             # Fixed nav with scroll detection + theme toggle
│   ├── Hero.tsx            # GSAP stagger reveal
│   ├── SelectedWork.tsx    # Hover-preview project list
│   ├── Approach.tsx        # Process section
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx     # Light/dark toggle
│   └── LenisProvider.tsx   # Smooth scroll context
├── lib/
│   └── projects.ts         # Project data (Murmur, Undercover, Gangui)
└── app/globals.css         # Design tokens, typography, resets
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Design Decisions

- **No Tailwind** — full control via CSS custom properties and CSS Modules
- **No UI library** — every component is hand-crafted
- **SSG only** — `generateStaticParams` for all dynamic routes; no server at runtime
- **Dynamic GSAP import** — avoids SSR bundle bloat; animations are purely progressive enhancement
