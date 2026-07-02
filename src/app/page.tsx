import GlobalCanvas from "@/components/canvas/GlobalCanvas";
import CTAScene from "@/components/canvas/CTAScene";
import SceneScrollTriggers from "@/components/animations/SceneScrollTriggers";
import LoadingScreen from "@/components/dom/LoadingScreen";
import Navbar from "@/components/dom/Navbar";
import HeroUI from "@/components/dom/HeroUI";
import HeroDragLayer from "@/components/dom/HeroDragLayer";
import Storytelling from "@/components/dom/Storytelling";
import FleetUI from "@/components/dom/FleetUI";
import WhyChooseUs from "@/components/dom/WhyChooseUs";
import BookingTimeline from "@/components/dom/BookingTimeline";
import Destinations from "@/components/dom/Destinations";
import Testimonials from "@/components/dom/Testimonials";
import Statistics from "@/components/dom/Statistics";
import Gallery from "@/components/dom/Gallery";
import FAQ from "@/components/dom/FAQ";
import CTAUI from "@/components/dom/CTAUI";
import Footer from "@/components/dom/Footer";

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
            {/* Canvas partikel lokal di belakang teks CTA */}
            <div className="pointer-events-none absolute inset-0">
              <CTAScene />
            </div>
            <CTAUI />
          </section>

          <Footer />
        </div>
      </div>
    </main>
  );
}
