"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroUI() {
  const containerRef = useRef<HTMLDivElement>(null);

  // useGSAP → auto-cleanup semua tween saat unmount (scope terikat containerRef)
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // TRICKY: tiap baris dibungkus <span overflow-hidden>.
      // yPercent:120 menyembunyikan teks di bawah mask, lalu reveal ke atas.
      tl.from(".hero-line", { yPercent: 120, duration: 1.4, stagger: 0.12 })
        .from(".hero-sub", { y: 30, opacity: 0, duration: 1 }, "-=0.9")
        .from(".hero-cta", { y: 24, opacity: 0, duration: 0.9 }, "-=0.7");
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none mx-auto w-full max-w-7xl px-6 md:px-10"
    >
      <h1 className="font-display text-6xl font-bold leading-[0.92] tracking-tighter md:text-8xl lg:text-9xl">
        <span className="block overflow-hidden">
          <span className="hero-line block">Drive</span>
        </span>
        <span className="block overflow-hidden">
          <span className="hero-line block bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Freedom.
          </span>
        </span>
      </h1>

      <p className="hero-sub mt-6 max-w-md font-body text-lg text-white/60 md:text-xl">
        Premium Car &amp; Motorcycle Rental Experience.
      </p>

      <div className="hero-cta mt-10">
        <button className="group pointer-events-auto inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-ui text-sm uppercase tracking-widest text-white backdrop-blur-md transition-all duration-500 ease-out hover:border-luxury-gold/40 hover:bg-white/10">
          Explore Fleet
          <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
