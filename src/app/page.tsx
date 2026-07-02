import dynamic from "next/dynamic";
import GlobalCanvas from "@/components/canvas/GlobalCanvas";
import CTASceneLazy from "@/components/canvas/CTASceneLazy";
import SceneScrollTriggers from "@/components/animations/SceneScrollTriggers";
import LoadingScreen from "@/components/dom/LoadingScreen";
import Navbar from "@/components/dom/Navbar";
import HeroUI from "@/components/dom/HeroUI";
import HeroDragLayer from "@/components/dom/HeroDragLayer";
import Storytelling from "@/components/dom/Storytelling";
import FleetUI from "@/components/dom/FleetUI";
import WhyChooseUs from "@/components/dom/WhyChooseUs";
import BookingTimeline from "@/components/dom/BookingTimeline";
import FAQ from "@/components/dom/FAQ";
import CTAUI from "@/components/dom/CTAUI";
import Footer from "@/components/dom/Footer";

// Placeholder dengan tinggi ~menyerupai section → cegah layout shift saat chunk dimuat.
function SectionSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
      <div className="h-4 w-40 animate-pulse rounded-full bg-white/5" />
      <div className="mt-6 h-14 w-[28rem] max-w-full animate-pulse rounded-2xl bg-white/5" />
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl bg-white/5" />
        ))}
      </div>
    </div>
  );
}

// ── Below-the-fold: code-split (ssr tetap true → tetap ter-render server, no shift) ──
const Destinations = dynamic(() => import("@/components/dom/Destinations"), {
  loading: () => <SectionSkeleton />,
});
const Testimonials = dynamic(() => import("@/components/dom/Testimonials"), {
  loading: () => <SectionSkeleton />,
});
const Statistics = dynamic(() => import("@/components/dom/Statistics"), {
  loading: () => <SectionSkeleton />,
});
const Gallery = dynamic(() => import("@/components/dom/Gallery"), {
  loading: () => <SectionSkeleton />,
});

export default function Home() {
  return (
    <main className="relative w-full">
      {/* Loading screen & Navbar khusus landing (tidak ikut ke /book) */}
      <LoadingScreen />
      <Navbar />

      {/* ── Layer 3D: satu Global Canvas, fixed, full-screen, di bawah (z-0) ── */}
      <div className="fixed inset-0 z-0">
        <GlobalCanvas />
      </div>

      {/* Controller scroll→canvas (render null, tidak tampak) */}
      <SceneScrollTriggers />

      {/* ── Layer DOM overlay (z-10) ──
          pointer-events-none di root → canvas menerima event di area #fleet (klik model 3D
          & parallax). Interaksi di-re-enable per-blok: hero, kartu Fleet, & blok konten bawah. */}
      <div className="pointer-events-none relative z-10">
        <section
          id="hero"
          className="pointer-events-auto relative flex min-h-screen w-full items-center"
        >
          {/* Penangkap drag 360° (di bawah teks/tombol Hero) */}
          <HeroDragLayer />
          <HeroUI />
        </section>

        <Storytelling />

        <section id="fleet" className="relative w-full py-32 md:py-48">
          <FleetUI />
        </section>

        {/* Konten padat duduk di atas backdrop hitam solid; gradient memudarkan
            transisi dari panggung 3D Fleet agar carousel tak mengganggu di baliknya.
            pointer-events-auto → seluruh interaksi section bawah kembali normal. */}
        <div className="pointer-events-auto relative bg-black">
          <div className="pointer-events-none absolute inset-x-0 -top-48 h-48 bg-gradient-to-b from-transparent to-black" />

          <section id="why" className="relative w-full py-32 md:py-48">
            <WhyChooseUs />
          </section>

          <section id="booking" className="relative w-full py-32 md:py-48">
            <BookingTimeline />
          </section>

          <section id="destinations" className="relative w-full py-32 md:py-48">
            <Destinations />
          </section>

          <section id="testimonials" className="relative w-full py-32 md:py-48">
            <Testimonials />
          </section>

          <section id="stats" className="relative w-full py-32 md:py-48">
            <Statistics />
          </section>

          <section id="gallery" className="relative w-full py-32 md:py-48">
            <Gallery />
          </section>

          <section id="faq" className="relative w-full py-32 md:py-48">
            <FAQ />
          </section>

          <section
            id="cta"
            className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-32"
          >
            {/* Canvas partikel lokal di belakang teks CTA (lazy, ssr:false) */}
            <div className="pointer-events-none absolute inset-0">
              <CTASceneLazy />
            </div>
            <CTAUI />
          </section>

          <Footer />
        </div>
      </div>
    </main>
  );
}
