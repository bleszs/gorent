"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 10000, suffix: "+", label: "Customers" },
  { value: 500, suffix: "+", label: "Vehicles" },
  { value: 98, suffix: "%", label: "Satisfaction" },
  { value: 24, suffix: "/7", label: "Service" },
];

/** Counter 0 → value, dipicu saat masuk viewport. */
function Counter({ value, suffix, label }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const count = useMotionValue(0);
  const display = useTransform(count, (v) => Math.floor(v).toLocaleString("en-US"));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, value, count]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-5xl font-bold tracking-tighter text-white md:text-7xl">
        <motion.span>{display}</motion.span>
        <span className="text-luxury-gold">{suffix}</span>
      </p>
      <p className="mt-3 font-ui text-sm uppercase tracking-[0.25em] text-white/50">
        {label}
      </p>
    </div>
  );
}

export default function Statistics() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
      <div className="grid grid-cols-2 gap-12 rounded-3xl border border-white/10 bg-white/5 px-8 py-16 backdrop-blur-md md:grid-cols-4 md:py-20">
        {STATS.map((stat) => (
          <Counter key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}
