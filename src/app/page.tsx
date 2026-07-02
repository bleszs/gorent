import GlobalCanvas from "@/components/canvas/GlobalCanvas";
import SceneScrollTriggers from "@/components/animations/SceneScrollTriggers";
import HeroUI from "@/components/dom/HeroUI";
import Storytelling from "@/components/dom/Storytelling";
import FleetUI from "@/components/dom/FleetUI";

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
      </div>
    </main>
  );
}
