import HeroScene from "@/components/canvas/HeroScene";
import HeroUI from "@/components/dom/HeroUI";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* ── Layer 3D: fixed, full-screen, di bawah (z-0) ── */}
      <div className="fixed inset-0 z-0">
        <HeroScene />
      </div>

      {/* ── Layer DOM overlay: di atas (z-10) ── */}
      <div className="relative z-10">
        <section className="relative flex min-h-screen w-full items-center">
          <HeroUI />
        </section>
      </div>
    </main>
  );
}
