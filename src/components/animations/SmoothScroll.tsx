"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppStore } from "@/store/useAppStore";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // makin kecil = makin "berat"/sinematik
      duration: 1.4,
      // easing expo.out → deselerasi mewah di akhir scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    // TRICKY: jangan jalankan lenis.raf sendiri + ScrollTrigger terpisah.
    // Satukan clock-nya ke gsap.ticker agar Lenis & ScrollTrigger sinkron sempurna.
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000); // gsap detik → lenis ms
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Bagikan instance agar Navbar bisa scrollTo() dengan inertia yang sama
    useAppStore.getState().setLenis(lenis);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      useAppStore.getState().setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
