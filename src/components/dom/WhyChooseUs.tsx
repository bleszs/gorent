"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface Feature {
  title: string;
  desc: string;
  icon: ReactNode;
}

const iconProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const FEATURES: Feature[] = [
  {
    title: "24/7 Support",
    desc: "Around-the-clock concierge, wherever the road takes you.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Affordable Price",
    desc: "Transparent premium rates with zero hidden fees.",
    icon: (
      <svg {...iconProps}>
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Insurance Included",
    desc: "Full coverage baked into every single booking.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l7 3v6c0 4-3 7-7 8-4-1-7-4-7-8V6l7-3Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Unlimited Mileage",
    desc: "Chase every horizon — no distance caps, ever.",
    icon: (
      <svg {...iconProps}>
        <path d="M6 9a3 3 0 1 0 0 6c2.2 0 3.2-1.6 6-3s3.8-3 6-3a3 3 0 1 1 0 6c-2.2 0-3.2-1.6-6-3S8.2 9 6 9Z" />
      </svg>
    ),
  },
  {
    title: "Fast Booking",
    desc: "From selection to keys in under two minutes.",
    icon: (
      <svg {...iconProps}>
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
  },
  {
    title: "Well Maintained",
    desc: "Every vehicle detailed and inspected before you ride.",
    icon: (
      <svg {...iconProps}>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 2.7 2.7 6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.2-2.2 2.5-2.5Z" />
      </svg>
    ),
  },
];

/** Kartu dengan 3D tilt mengikuti mouse (Framer Motion motion values + spring). */
function TiltCard({ feature }: { feature: Feature }) {
  const ref = useRef<HTMLDivElement>(null);

  // -0.5..0.5 relatif terhadap tengah kartu
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springCfg = { stiffness: 150, damping: 15, mass: 0.4 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), springCfg);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), springCfg);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-colors duration-500 ease-out hover:border-luxury-gold/30 hover:shadow-[0_0_60px_-15px_rgba(212,175,55,0.35)]"
    >
      {/* Glow radial saat hover */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full bg-electric-blue/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div style={{ transform: "translateZ(45px)" }}>
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-luxury-gold transition-colors duration-500 group-hover:text-white">
          {feature.icon}
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-white">
          {feature.title}
        </h3>
        <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-white/50">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
      <header className="mb-16 max-w-2xl">
        <p className="mb-4 font-ui text-sm uppercase tracking-[0.3em] text-luxury-gold">
          Why GORENT
        </p>
        <h2 className="font-display text-5xl font-bold tracking-tighter md:text-7xl">
          Built for the journey
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-6 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <TiltCard key={feature.title} feature={feature} />
        ))}
      </div>
    </div>
  );
}
