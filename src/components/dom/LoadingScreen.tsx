"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

/**
 * Tirai loading sinematik — self-driven (0→100 dalam ~1s) lalu tergeser naik.
 *
 * Sengaja TIDAK bergantung pada useProgress/3D: canvas kini di-defer (DeferredCanvas),
 * jadi tirai harus lekas terangkat agar teks Hero (LCP) tampil cepat. Ini juga
 * mencegah drei/three ikut ke bundle kritis awal.
 */
const DURATION_MS = 1000;

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [percent, setPercent] = useState(0);
  const setLoaded = useAppStore((s) => s.setLoaded);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION_MS);
      setPercent(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        setTimeout(() => setShow(false), 250); // beat dramatis
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={setLoaded}>
      {show && (
        <motion.div
          key="loader"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[22vw] font-bold leading-none tracking-tighter text-white md:text-[16vw]">
              {percent}
            </span>
            <span className="font-display text-4xl font-bold text-luxury-gold md:text-6xl">
              %
            </span>
          </div>

          <div className="mt-8 h-px w-56 overflow-hidden bg-white/10 md:w-80">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-electric-blue to-luxury-gold"
              style={{ scaleX: percent / 100 }}
            />
          </div>

          <p className="mt-8 font-ui text-xs uppercase tracking-[0.4em] text-white/40">
            Preparing your ride
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
