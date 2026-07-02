"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useBookingStore } from "@/store/useBookingStore";
import Step1Vehicle from "@/components/booking/Step1Vehicle";
import Step2Date from "@/components/booking/Step2Date";
import Step3Confirm from "@/components/booking/Step3Confirm";

const STEP_LABELS = ["Vehicle", "Dates", "Confirm"];

export default function BookPage() {
  // State disiapkan oleh startBooking() di pintu masuk (Navbar/CTA/kartu Fleet),
  // dan dipulihkan dari localStorage untuk kasus refresh.
  const step = useBookingStore((s) => s.step);
  const hasHydrated = useBookingStore((s) => s._hasHydrated);

  // Rehydrate manual SETELAH mount → render pertama tetap == server (no mismatch)
  useEffect(() => {
    useBookingStore.persist.rehydrate();
  }, []);

  // Sebelum hydration selesai, render placeholder yang identik server & client
  if (!hasHydrated) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-black">
        <p className="animate-pulse font-ui text-sm uppercase tracking-[0.3em] text-white/40">
          Loading…
        </p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Aurora / mesh gradient halus di latar */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full bg-electric-blue/20 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-luxury-gold/15 blur-[140px]"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10 md:px-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tighter transition-opacity duration-500 hover:opacity-70"
          >
            GORENT
          </Link>
          <span className="font-ui text-sm text-white/40">
            Step {step} of 3
          </span>
        </header>

        {/* Progress indicator */}
        <div className="mt-8 flex items-center gap-3">
          {STEP_LABELS.map((label, i) => {
            const index = i + 1;
            const active = step >= index;
            return (
              <div key={label} className="flex flex-1 items-center gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border font-ui text-xs transition-all duration-500 ${
                      active
                        ? "border-luxury-gold bg-luxury-gold text-black"
                        : "border-white/20 text-white/40"
                    }`}
                  >
                    {index}
                  </span>
                  <span
                    className={`hidden font-ui text-xs uppercase tracking-widest transition-colors duration-500 sm:block ${
                      active ? "text-white" : "text-white/30"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {index < STEP_LABELS.length && (
                  <div className="h-px flex-1 bg-white/10">
                    <div
                      className={`h-full origin-left bg-luxury-gold transition-transform duration-700 ease-out ${
                        step > index ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Steps */}
        <div className="flex flex-1 items-center py-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {step === 1 && <Step1Vehicle />}
              {step === 2 && <Step2Date />}
              {step === 3 && <Step3Confirm />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
