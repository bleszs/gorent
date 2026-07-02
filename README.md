<div align="center">

# 🏎️ GORENT

### Premium Car & Motorcycle Rental — a cinematic digital showroom

Drive Freedom. A next-generation rental experience built around emotional storytelling, real-time 3D, and scroll-driven cinematics — not a conventional UI template.

[**▶ Live Demo**](https://gorent-seven.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?logo=three.js&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)

</div>

---

## ✨ Overview

GORENT is a **dark‑luxury** landing + booking experience: a real 3D vehicle you can drag to spin 360°, a scroll‑driven camera, a 3D fleet carousel you can click to book, a multi‑step booking flow with a QRIS payment sandbox, and a persisted profile with booking history — all wrapped in a glassmorphism design system and tuned for performance.

## 🎬 Features

- **Cinematic 3D hero** — real `.glb` model (DRACO‑compressed), drag to rotate 360°, scroll‑driven camera dolly & fly‑away.
- **12 storytelling sections** — Hero → Storytelling (pinned scrub) → Fleet (3D carousel) → Why Choose Us (3D tilt cards) → Booking timeline → Destinations (parallax + floating pins) → Testimonials (infinite marquee) → Statistics (count‑up) → Gallery (masonry + parallax) → FAQ (accordion) → CTA (particles) → Footer.
- **Click‑to‑book** — click a fleet card *or* its 3D model → pre‑selects the vehicle and routes to `/book`.
- **Multi‑step booking** (`/book`) — vehicle → dates → confirm, with a **QRIS payment sandbox** (simulated gateway) and animated step transitions.
- **Profile & history** (`/profile`) — glassmorphism dashboard, Active / Past tabs, booking history **persisted** across refresh.
- **Cinematic loading curtain**, magnetic buttons, Lenis smooth inertia scroll, and dynamic SEO / Open Graph images.

## 🛠️ Tech Stack

| Area | Tech |
|---|---|
| Framework | **Next.js 15** (App Router) · React 19 · **TypeScript (strict)** |
| Styling | **Tailwind CSS v4** (glassmorphism, `@theme` tokens) |
| 3D / WebGL | **Three.js** · React Three Fiber · Drei (DRACO, Environment, ContactShadows) |
| Animation | **GSAP** (ScrollTrigger) · Framer Motion (micro‑interactions) |
| Scroll | **Lenis** (physics‑based smooth scroll, synced to GSAP ticker) |
| State | **Zustand** (+ `persist` middleware) |
| Deploy | **Vercel** |

## 🧠 Architecture Highlights

A few deliberate engineering decisions that make it feel handcrafted:

- **Single global WebGL context** — one `<Canvas>` (`GlobalCanvas`) hosts every 3D scene across sections instead of one canvas per section (performance).
- **DOM → Store → Canvas bridge** — GSAP ScrollTrigger and pointer drags write scroll/rotation progress into a Zustand store; R3F reads it via `getState()` inside `useFrame` — **no React re‑render per frame**.
- **Pointer‑events layering** — the DOM overlay is `pointer-events-none` at the root and re‑enabled per block, so clicks pass through to the canvas exactly where the fleet models live (raycast‑clickable 3D).
- **SSR‑safe persisted store** — `persist` with `skipHydration` + manual `rehydrate()` + a `_hasHydrated` gate → zero hydration mismatch on `/book` and `/profile`.
- **Performance‑first 3D** — DRACO‑compressed models (**car.glb 21 MB → 1.1 MB**, fleet **122 MB → 11 MB**), fleet models **lazy‑mounted** on scroll approach, and the whole three.js canvas **deferred past LCP** (`requestIdleCallback` + fade‑in) → home First‑Load JS **480 kB → 213 kB**.
- **Dynamic SEO** — favicon, apple‑icon, and 1200×630 Open Graph image generated at the edge via `next/og`.

## 📁 Project Structure

```
src/
├─ app/
│  ├─ layout.tsx            # fonts, metadata, viewport, SmoothScroll
│  ├─ page.tsx              # landing composition (overlay + deferred canvas)
│  ├─ book/page.tsx         # multi-step booking flow
│  ├─ profile/page.tsx      # profile + booking history dashboard
│  ├─ icon.tsx · apple-icon.tsx · opengraph-image.tsx   # next/og
│  └─ globals.css           # Tailwind v4 @theme design tokens
├─ components/
│  ├─ canvas/               # 3D only (GlobalCanvas, HeroScene, FleetScene, CTAScene, CameraRig, DeferredCanvas)
│  ├─ dom/                  # UI overlays (Hero, Fleet, WhyChooseUs, Gallery, Navbar, Footer, LoadingScreen, …)
│  ├─ booking/              # Step1Vehicle, Step2Date, Step3Confirm, PaymentSandbox
│  └─ animations/           # SmoothScroll, Magnetic, SceneScrollTriggers
├─ store/                   # useSceneStore (3D bridge), useBookingStore (persisted), useAppStore
└─ data/                    # fleet.ts (single source of truth: name ↔ model ↔ price)
public/models/              # DRACO-compressed .glb assets
```

## 🚀 Getting Started

**Prerequisites:** Node.js 18+ and **pnpm**.

```bash
# Install pnpm if needed
corepack enable pnpm        # or: npm install -g pnpm

# Install dependencies
pnpm install

# Run the dev server
pnpm dev                    # http://localhost:3000
```

### Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build (use this for Lighthouse) |
| `pnpm lint` | Run ESLint |

> **Note:** native build scripts (`sharp`, `unrs-resolver`) are allow‑listed in `pnpm-workspace.yaml`. 3D models use DRACO decoding via the gstatic CDN, so an internet connection is required in dev for the hero/fleet models and the studio HDRI.

## 🎨 Design System

- **Background:** solid black `#000` / deep slate `#0F172A`
- **Accents:** electric blue `#3B82F6` · luxury gold `#D4AF37`
- **Type:** Space Grotesk (display) · Plus Jakarta Sans (body) · Inter (UI)
- **Motion:** `expo.out` / cubic `[0.16, 1, 0.3, 1]` easing, glassmorphism `bg-white/5 backdrop-blur-md border-white/10`

## 📈 Performance

- Home route First‑Load JS: **213 kB** (three.js deferred past LCP)
- Lighthouse: **SEO 100 · Best Practices 100 · Accessibility 96+**
- Layout shift (CLS): ~0.004

## 🗺️ Roadmap

- [x] Cinematic landing (12 sections) + 3D hero
- [x] 3D fleet carousel + click‑to‑book
- [x] Multi‑step booking + QRIS payment sandbox
- [x] Persisted profile & booking history
- [x] SEO / Open Graph + performance pass (lazy models, deferred canvas)
- [ ] Real payment gateway (e.g. Midtrans)
- [ ] Auth & real backend
- [ ] Dark / light theme toggle

## 📄 License

This project is for portfolio / demonstration purposes.

<div align="center">

Built with obsession for detail. **Drive Freedom.**

</div>
