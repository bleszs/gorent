# Technical Stack & Architecture

## Core Framework
- **Next.js (App Router):** For optimized rendering, SEO, and fast page loads.
- **React 18+:** Utilizing concurrent features for smooth 3D rendering.

## Styling & UI
- **Tailwind CSS:** For utility-first styling, glassmorphism effects, and responsive design.
- **Lenis Studio / Lenis Scroll:** For smooth, physics-based inertia scrolling (crucial for cinematic feel).

## Animation & 3D WebGL
- **GSAP (GreenSock):** Core animation engine, specifically utilizing `ScrollTrigger` for section transitions and pinned layouts.
- **Three.js & React Three Fiber (R3F):** For rendering 3D car and motorcycle models.
- **React Three Drei:** For pre-built 3D helpers (Environment, ContactShadows, Float, PresentationControls).
- **Framer Motion:** For page transitions and complex UI micro-interactions (magnetic buttons, text reveals).

## Asset Management & Performance
- **GLTF/GLB Models:** Compressed using Draco for fast loading.
- **Suspense & Lazy Loading:** Skeleton loaders for 3D canvases to ensure the UI doesn't block while models load.

## Deployment & Hosting
- **Vercel / Netlify:** Target deployment environments. Ensure edge caching and CI/CD via GitHub are optimized.