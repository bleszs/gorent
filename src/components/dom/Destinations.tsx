"use client";

/* eslint-disable @next/next/no-img-element -- background image imersif butuh <img> mentah untuk parallax bebas */

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Destination {
  city: string;
  country: string;
  id: string; // Unsplash photo id (placeholder, mudah ditukar)
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

const DESTINATIONS: Destination[] = [
  { city: "Bali", country: "Indonesia", id: "1518548419970-58e3b4079ab2" },
  { city: "Tokyo", country: "Japan", id: "1540959733332-eab4deabeeaf" },
  { city: "Dubai", country: "UAE", id: "1512453979798-5ea266f8880c" },
  { city: "Swiss Alps", country: "Switzerland", id: "1506905925346-21bda4d32df4" },
];

/** Pin lokasi melayang dengan gerak lambat acak (Framer Motion loop). */
function FloatingPin({
  className,
  delay,
  duration,
  drift,
}: {
  className: string;
  delay: number;
  duration: number;
  drift: { x: number; y: number };
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      animate={{ x: [0, drift.x, 0], y: [0, drift.y, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative">
        <span className="absolute inset-0 animate-ping rounded-full bg-luxury-gold/40" />
        <span className="relative block h-3 w-3 rounded-full bg-luxury-gold shadow-[0_0_12px_rgba(212,175,55,0.9)]" />
      </div>
    </motion.div>
  );
}

export default function Destinations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax background per kartu
      gsap.utils.toArray<HTMLElement>(".dest-media").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest(".dest-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.from(".dest-heading", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });

      gsap.from(".dest-card", {
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        y: 70,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.12,
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-7xl px-6 md:px-10">
      <header className="dest-heading mb-16 max-w-2xl">
        <p className="mb-4 font-ui text-sm uppercase tracking-[0.3em] text-luxury-gold">
          Where to
        </p>
        <h2 className="font-display text-5xl font-bold tracking-tighter md:text-7xl">
          Popular Destinations
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {DESTINATIONS.map((dest, i) => (
          <article
            key={dest.city}
            className="dest-card group relative h-[60vh] overflow-hidden rounded-3xl border border-white/10"
          >
            {/* Media parallax (overscan tinggi agar tak bocor saat geser) */}
            <img
              src={unsplash(dest.id)}
              alt={`${dest.city}, ${dest.country}`}
              loading="lazy"
              className="dest-media absolute inset-0 h-[130%] w-full -translate-y-[12%] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Pin melayang */}
            <FloatingPin
              className="left-[22%] top-[28%]"
              delay={i * 0.4}
              duration={6}
              drift={{ x: 14, y: -18 }}
            />
            <FloatingPin
              className="right-[28%] top-[40%]"
              delay={i * 0.4 + 1.2}
              duration={7.5}
              drift={{ x: -12, y: 16 }}
            />

            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
              <p className="font-ui text-sm uppercase tracking-[0.3em] text-luxury-gold">
                {dest.country}
              </p>
              <h3 className="mt-2 font-display text-4xl font-bold tracking-tighter text-white md:text-6xl">
                {dest.city}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
