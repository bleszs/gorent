"use client";

/* eslint-disable @next/next/no-img-element -- avatar placeholder (pravatar) pakai <img> mentah */

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: number; // pravatar id
}

const TESTIMONIALS: Testimonial[] = [
  { name: "Andreas V.", role: "Entrepreneur", quote: "The smoothest rental experience I've ever had. The car arrived spotless.", avatar: 12 },
  { name: "Mei Lin", role: "Travel Blogger", quote: "Booked a sport bike for the coast — pure freedom. Flawless service.", avatar: 5 },
  { name: "Carlos R.", role: "Photographer", quote: "Luxury without the hassle. GORENT redefined what rental means to me.", avatar: 33 },
  { name: "Sofia D.", role: "Architect", quote: "Fast booking, immaculate vehicles. The concierge support is unreal.", avatar: 47 },
  { name: "James K.", role: "Founder", quote: "From selection to keys in minutes. Every detail feels premium.", avatar: 8 },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:w-[400px]">
      <blockquote className="font-body text-lg leading-relaxed text-white/80">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        {/* Avatar melayang halus */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3 + (t.avatar % 3),
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="shrink-0"
        >
          <img
            src={`https://i.pravatar.cc/120?img=${t.avatar}`}
            alt={t.name}
            loading="lazy"
            className="h-12 w-12 rounded-full border border-white/20 object-cover"
          />
        </motion.div>
        <div>
          <p className="font-display font-semibold tracking-tight text-white">
            {t.name}
          </p>
          <p className="font-ui text-sm text-white/40">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      // Marquee tak terbatas: track berisi 2 salinan, geser -50% lalu ulang mulus
      tween.current = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <header className="mx-auto mb-16 w-full max-w-7xl px-6 md:px-10">
        <p className="mb-4 font-ui text-sm uppercase tracking-[0.3em] text-luxury-gold">
          Loved by drivers
        </p>
        <h2 className="font-display text-5xl font-bold tracking-tighter md:text-7xl">
          What riders say
        </h2>
      </header>

      {/* Fade tepi kiri/kanan agar marquee larut ke background */}
      <div
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        onMouseEnter={() => tween.current?.pause()}
        onMouseLeave={() => tween.current?.resume()}
      >
        <div ref={trackRef} className="flex w-max gap-6 py-4">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
