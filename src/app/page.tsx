import GlobalCanvas from "@/components/canvas/GlobalCanvas";
import CTAScene from "@/components/canvas/CTAScene";
import SceneScrollTriggers from "@/components/animations/SceneScrollTriggers";
import HeroUI from "@/components/dom/HeroUI";
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
      {/* ── Layer 3D: satu Global Canvas, fixed, full-screen, di bawah (z-0) ── */}
      <div className="fixed inset-0 z-0">
        <GlobalCanvas />
      </div>

      {/* Controller scroll→canvas (render null, tidak tampak) */}
      <SceneScrollTriggers />

      {/* ── Layer DOM overlay: di atas (z-10) ── */}
      <div className="relative z-10">
        <section
          id="hero"
          className="relative flex min-h-screen w-full items-center"
        >
          <HeroUI />
        </section>

        <Storytelling />

        <section id="fleet" className="relative w-full py-32 md:py-48">
          <FleetUI />
        </section>

        {/* Konten padat duduk di atas backdrop hitam solid; gradient memudarkan
            transisi dari panggung 3D Fleet agar carousel tak mengganggu di baliknya */}
        <div className="relative bg-black">
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
