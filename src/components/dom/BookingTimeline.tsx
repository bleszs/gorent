"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { title: "Choose Vehicle", desc: "Browse the fleet and pick your ride." },
  { title: "Select Date", desc: "Set your pick-up and return window." },
  { title: "Complete Payment", desc: "Secure checkout in a single tap." },
  { title: "Pick Up Vehicle", desc: "Collect your keys, fully detailed." },
  { title: "Enjoy Your Trip", desc: "Hit the road. Drive freedom." },
];

export default function BookingTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Garis menyala menghubungkan titik (scrub mengikuti scroll)
      gsap.fromTo(
        ".timeline-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-track",
            start: "top 65%",
            end: "bottom 60%",
            scrub: 1,
          },
        },
      );

      // Tiap langkah fade-up berurutan
      gsap.from(".timeline-step", {
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.15,
      });

      gsap.from(".timeline-heading", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-7xl px-6 md:px-10">
      <header className="timeline-heading mb-20 max-w-2xl">
        <p className="mb-4 font-ui text-sm uppercase tracking-[0.3em] text-luxury-gold">
          How it works
        </p>
        <h2 className="font-display text-5xl font-bold tracking-tighter md:text-7xl">
          Booking Process
        </h2>
      </header>

      <div className="timeline-track relative">
        {/* Garis dasar + garis progress (md ke atas) */}
        <div className="absolute left-[10%] right-[10%] top-6 hidden h-px bg-white/10 md:block">
          <div className="timeline-progress h-full origin-left scale-x-0 bg-gradient-to-r from-electric-blue via-white to-luxury-gold" />
        </div>

        <ol className="grid grid-cols-1 gap-12 md:grid-cols-5 md:gap-6">
          {STEPS.map((step, i) => (
            <li key={step.title} className="timeline-step relative">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black font-display text-lg font-semibold text-luxury-gold backdrop-blur-md">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[16rem] font-body text-sm leading-relaxed text-white/50">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
