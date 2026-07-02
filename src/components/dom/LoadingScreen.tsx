"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { useAppStore } from "@/store/useAppStore";

/**
 * Tirai loading global.
 * - useProgress (drei) melacak pemuatan aset 3D (mis. HDRI Environment) via loading manager.
 * - Saat 100%, tahan sejenak lalu geser tirai ke atas → page reveal sinematik.
 * - Fallback timeout menjaga tirai tidak macet bila tak ada aset yang terdaftar.
 */
export default function LoadingScreen() {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);
  const setLoaded = useAppStore((s) => s.setLoaded);

  // Sembunyikan saat progres penuh (tahan ~700ms untuk beat dramatis)
  useEffect(() => {
    if (progress < 100) return;
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
  }, [progress]);

  // Fallback: paksa reveal maksimal 6s (mis. aset ter-cache / tak ada loader)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const percent = Math.min(100, Math.round(progress));

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

          {/* Garis progres tipis */}
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
