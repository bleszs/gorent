# CLAUDE.md — LuxeRide Cinematic Rental Web

> Catatan penting: File ini adalah sumber kebenaran utama (Single Source of Truth) untuk arsitektur, gaya kode, dan aturan pengembangan proyek ini. Baca seluruhnya sebelum mulai menulis kode.

---

## 1. Project Overview

- Name : Gorent
- Description : Platform penyewaan mobil & motor premium dengan pengalaman visual sinematik. Web ini berfungsi ganda sebagai *digital luxury showroom* dengan interaksi 3D, animasi scroll GSAP, dan estetika futuristik.
- Goal : Menghadirkan pengalaman *emotional storytelling* melalui *scroll-driven animations* dan interaksi 3D WebGL, melampaui desain web rental konvensional.
- Target Users: Klien high-end, penggemar otomotif luxury, dan penyewa kendaraan premium.
- Version : v1.0.0
- Status : Active development

---

## 2. Tech Stack

- Language : TypeScript (Strict Mode)
- Framework : Next.js (App Router) + React 18+
- Styling : Tailwind CSS (diutamakan untuk efek Glassmorphism & UI)
- 3D Engine : Three.js, React Three Fiber (R3F), React Three Drei
- Animation : GSAP (ScrollTrigger), Framer Motion (hanya untuk micro-interactions DOM)
- Scroll : Lenis Studio (untuk smooth inertia scrolling)
- State Management: Zustand (untuk global state, misal: loading screen, audio toggle)
- Package Manager : pnpm (WAJIB, jangan gunakan npm/yarn)
- Deployment : Vercel

---

## 3. Commands

```bash
# Development
pnpm dev          # Jalankan dev server Next.js
pnpm build        # Build untuk production
pnpm start        # Jalankan production build
pnpm lint         # Jalankan linter

# Package Management
pnpm add [package]       # Install package baru
pnpm add -D [package]    # Install dev dependencies

4. Project Structure
Architecture: Feature-based & Strict Canvas/DOM Separation.
Sangat Penting: Logika 3D (Canvas) tidak boleh dicampur adukkan langsung dengan HTML biasa dalam satu hierarki tanpa wrapper yang tepat.

[root]/
  src/
    app/              # Next.js App Router (Pages, Layouts, API)
    components/
      canvas/         # KHUSUS komponen 3D (R3F, Three.js, Models, Lights)
      dom/            # KHUSUS komponen UI HTML/Tailwind biasa (Navbar, Text, Buttons)
      animations/     # Logic GSAP dan transisi halaman
    hooks/            # Custom hooks (e.g., useScroll, useWindowSize)
    store/            # Zustand global stores
    utils/            # Helper functions
    assets/
      models/         # File .glb / .gltf untuk kendaraan
      textures/       # File gambar untuk material 3D
  public/             # Static assets publik
Aturan penempatan file:

Komponen Three.js (mesh, lights, camera) WAJIB masuk ke src/components/canvas/.

UI overlay, teks, dan tombol WAJIB masuk ke src/components/dom/.

Jangan pernah buat folder baru tanpa alasan teknis yang kuat.

5. Naming Conventions
# File dan Folder
- R3F Components: [Nama]3D.tsx    contoh: CarModel3D.tsx, Scene3D.tsx
- DOM Components: [Nama].tsx      contoh: HeroOverlay.tsx, GlassButton.tsx
- Hooks         : camelCase       contoh: useScrollAnimation.ts

# Di dalam Kode
- Ref untuk GSAP: [nama]Ref       contoh: containerRef, textRevealRef
- R3F Refs      : [nama]MeshRef   contoh: carMeshRef
- Variabel CSS  : kebab-case      contoh: --color-luxury-gold
6. Code Conventions & 3D Rules
# Pengembangan 3D (React Three Fiber)
- TIDAK BOLEH merender elemen HTML biasa di dalam `<Canvas>` kecuali dibungkus dengan `<Html>` dari `@react-three/drei`.
- Selalu gunakan `useFrame` untuk animasi berkelanjutan di dalam Canvas, bukan `useEffect` + `setInterval`.
- Hindari instansiasi material atau geometri di dalam loop render.

# Animasi (GSAP)
- Bersihkan semua instance GSAP di dalam fungsi return `useEffect` (atau gunakan `gsap.context()` / `@gsap/react`).
- Gunakan `power4.out` atau `expo.out` sebagai default easing untuk kesan mewah/sinematik.

# TypeScript
- Selalu buat `interface` atau `type` untuk Props komponen.
- Dilarang keras menggunakan tipe `any`. Gunakan `unknown` jika terpaksa.
7. Component Rules
# Server vs Client Component (Next.js)
- Semua komponen di dalam `src/components/canvas/` WAJIB menggunakan arahan `'use client'` di baris paling atas.
- Komponen GSAP dan animasi interaktif WAJIB menggunakan `'use client'`.
- Layout utama dan metadata halaman tetap sebagai Server Components.

# Struktur Komponen DOM Overlay
- Gunakan struktur absolut (absolute positioning) yang di-layer di atas Canvas 3D menggunakan z-index.
- Pointer events pada overlay UI harus diatur dengan cermat (`pointer-events-none` pada container, `pointer-events-auto` pada tombol) agar interaksi mouse ke Canvas 3D (rotasi kamera) tidak terblokir.
8. Styling Rules
# Pendekatan Styling
- Eksekusi murni dengan Tailwind CSS.
- Estetika: Dark mode default. Modern, premium, banyak whitespace.

# Desain Sistem Kustom
- Background: Hitam solid (#000000) atau Deep Slate (#0F172A).
- Text: Putih bersih (#FFFFFF) atau abu-abu elegan (#9CA3AF) untuk deskripsi.
- Aksen: Luxury Gold (#D4AF37) untuk highlight dan interaksi mikro.
- Glassmorphism: Terapkan dengan utility `bg-white/5 backdrop-blur-md border border-white/10`. Jangan gunakan warna solid untuk UI cards.

# Typography
- Headings: Space Grotesk (Gunakan utility text besar seperti `text-6xl md:text-8xl tracking-tighter`).
- Body: Plus Jakarta Sans / Inter.
9. Performance Rules (SANGAT KRITIS)
# R3F & WebGL Performance
- Semua model 3D (mobil, motor) WAJIB menggunakan ekstensi `.glb` yang dikompresi menggunakan DRACO.
- WAJIB membungkus pemuatan model 3D menggunakan `<Suspense>` dengan *fallback* berupa komponen skeleton/loading screen UI yang estetik.
- Matikan bayangan (shadows) yang tidak perlu. Gunakan `<ContactShadows>` dari `drei` sebagai ganti *real-time directional shadows* untuk performa lebih baik.
- Terapkan `dpr={[1, 2]}` pada `<Canvas>` untuk membatasi resolusi pixel pada layar retina agar GPU tidak overwork.

# DOM Performance
- Font WAJIB dioptimasi menggunakan `next/font`.
- Lakukan lazy loading komponen berat (misal: bagian Footer atau FAQ) menggunakan `next/dynamic`.
10. Do Not (ATURAN ANTI-HALUSINASI)
JIKA INSTRUKSI AMBIGU, TANYA SEBELUM MENULIS KODE.

# DILARANG KERAS:
1. Dilarang memberikan kode UI/UX bergaya template Bootstrap atau desain korporat standar. Proyek ini harus terlihat seperti website Apple, Porsche, atau Awwwards winner.
2. Dilarang mengarang/halusinasi path URL model 3D (misal: `url='/honda.glb'`). Jika model tidak ada, gunakan mesh primitif dasar (`<boxGeometry>`, dll) sebagai PLACEHOLDER sementara.
3. Dilarang menggabungkan file `.glb` secara langsung di komponen DOM. 
4. Dilarang menggunakan CSS native (style.css) untuk animasi kompleks. HANYA gunakan GSAP ScrollTrigger.
5. Dilarang lupa menambahkan `'use client'` pada file yang menggunakan hooks React atau Three.js.
6. Dilarang menghapus transisi yang smooth. State perubahan (hover, klik) WAJIB memiliki `transition-all duration-500 ease-out`.
11. Git Rules
# Commit Convention
- Ikuti standar semantic: `feat:`, `fix:`, `chore:`, `refactor:`, `style:`, `perf:`
- Setiap selesai membuat satu Section (misal: Section 1 Hero 3D), langsung lakukan commit. Jangan gabung pembuatan 3 section dalam 1 commit.
12. Task Progress / Features
# Fase 1: Setup & Core
- [ ] Setup Next.js, Tailwind, Lenis Scroll
- [ ] Setup Global Canvas 3D & Scene Environment
- [ ] Implementasi Global Loading Screen

# Fase 2: 3D Models & Hero
- [ ] Import Placeholder Model (Mobil/Motor)
- [ ] Hero Section UI (Typography "Drive Freedom")
- [ ] GSAP ScrollTrigger untuk rotasi kamera Hero

# Fase 3: Sections & Storytelling
- [ ] Section Choose Your Ride (3D Carousel)
- [ ] Section Why Choose Us (Glassmorphism Cards)
- [ ] Section Booking Process (Animated Timeline)
- [ ] Section Gallery (Masonry) & Footer