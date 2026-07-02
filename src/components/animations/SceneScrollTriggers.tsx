"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSceneStore } from "@/store/useSceneStore";

gsap.registerPlugin(ScrollTrigger);

/**
 * Controller pusat: memetakan posisi scroll DOM → store (dibaca canvas).
 * Sengaja hanya mengambil setter (referensi stabil) → komponen ini
 * tidak ikut re-render tiap update scroll.
 */
export default function SceneScrollTriggers() {
  const setHeroProgress = useSceneStore((s) => s.setHeroProgress);
  const setFleetProgress = useSceneStore((s) => s.setFleetProgress);

  useGSAP(() => {
    // Hero: 0 → 1 selama viewport pertama di-scroll
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => setHeroProgress(self.progress),
    });

    // Fleet: 0 → 1 saat section masuk penuh ke viewport (carousel scale-in)
    ScrollTrigger.create({
      trigger: "#fleet",
      start: "top bottom",
      end: "top center",
      scrub: true,
      onUpdate: (self) => setFleetProgress(self.progress),
    });
  }, []);

  return null;
}
