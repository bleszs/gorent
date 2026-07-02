"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section pinned/sticky sinematik.
 * Selama section "menempel", scrubbing men-transisikan:
 *   "Start your journey."  →(fade + blur + naik)→  "Unleash the thrill."
 * Kedua teks di-stack absolut di titik yang sama agar terjadi crossfade mulus.
 */
export default function Storytelling() {
  const sectionRef = useRef<HTMLElement>(null);
  const textOneRef = useRef<HTMLHeadingElement>(null);
  const textTwoRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%", // durasi pin (1.5 viewport)
          pin: true,
          scrub: 1,
        },
      });

      tl.to(textOneRef.current, {
        opacity: 0,
        yPercent: -40,
        filter: "blur(12px)",
      }).fromTo(
        textTwoRef.current,
        { opacity: 0, yPercent: 40, filter: "blur(12px)" },
        { opacity: 1, yPercent: 0, filter: "blur(0px)" },
        "<0.15", // sedikit overlap → crossfade
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center px-6"
    >
      {/* Grid stack: kedua teks menempati sel yang sama */}
      <div className="grid place-items-center [grid-template-areas:'stack']">
        <h2
          ref={textOneRef}
          className="[grid-area:stack] max-w-4xl text-center font-display text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl"
        >
          Start your journey.
        </h2>
        <h2
          ref={textTwoRef}
          className="[grid-area:stack] max-w-4xl text-center font-display text-5xl font-bold tracking-tighter opacity-0 md:text-7xl lg:text-8xl"
        >
          <span className="bg-gradient-to-r from-electric-blue via-white to-luxury-gold bg-clip-text text-transparent">
            Unleash the thrill.
          </span>
        </h2>
      </div>
    </section>
  );
}
