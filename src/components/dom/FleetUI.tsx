"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FLEET, formatIDR } from "@/data/fleet";
import { useBookingStore } from "@/store/useBookingStore";

gsap.registerPlugin(ScrollTrigger);

export default function FleetUI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const startBooking = useBookingStore((s) => s.startBooking);

  // Klik kartu → pre-select kendaraan → navigasi mulus ke /book
  const handleSelect = (name: string) => {
    startBooking(name);
    router.push("/book");
  };

  useGSAP(
    () => {
      gsap.from(".fleet-heading", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });

      gsap.from(".fleet-card", {
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-7xl px-6 md:px-10">
      <header className="fleet-heading mb-16 max-w-2xl">
        <p className="mb-4 font-ui text-sm uppercase tracking-[0.3em] text-luxury-gold">
          The Fleet
        </p>
        <h2 className="font-display text-5xl font-bold tracking-tighter md:text-7xl">
          Choose Your Ride
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FLEET.map((vehicle) => (
          <button
            key={vehicle.name}
            onClick={() => handleSelect(vehicle.name)}
            className="fleet-card group pointer-events-auto relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-luxury-gold/40 hover:bg-white/10 hover:shadow-[0_0_50px_-12px_rgba(212,175,55,0.35)]"
          >
            {/* Glow aksen yang mengikuti hover */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric-blue/20 opacity-0 blur-3xl transition-opacity duration-500 ease-out group-hover:opacity-100" />

            <div className="relative flex items-start justify-between">
              <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 font-ui text-xs uppercase tracking-widest text-white/60">
                {vehicle.category}
              </span>
              <span className="text-xl text-white/40 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:text-luxury-gold">
                →
              </span>
            </div>

            <h3 className="relative mt-10 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {vehicle.name}
            </h3>
            <p className="relative mt-2 font-body text-sm text-white/50">
              {vehicle.tagline}
            </p>
            <p className="relative mt-4 font-ui text-sm text-white/70">
              {formatIDR(vehicle.pricePerDay)}
              <span className="text-white/40"> / day</span>
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
