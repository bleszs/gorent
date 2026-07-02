import GlobalCanvas from "@/components/canvas/GlobalCanvas";
import SceneScrollTriggers from "@/components/animations/SceneScrollTriggers";
import HeroUI from "@/components/dom/HeroUI";
import Storytelling from "@/components/dom/Storytelling";
import FleetUI from "@/components/dom/FleetUI";
import WhyChooseUs from "@/components/dom/WhyChooseUs";
import BookingTimeline from "@/components/dom/BookingTimeline";
import Gallery from "@/components/dom/Gallery";
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

          <section id="gallery" className="relative w-full py-32 md:py-48">
            <Gallery />
          </section>

          <Footer />
        </div>
      </div>
    </main>
  );
}
