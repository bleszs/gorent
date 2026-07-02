"use client";

import { useBookingStore } from "@/store/useBookingStore";
import { FLEET, formatIDR } from "@/data/fleet";

export default function Step1Vehicle() {
  const selectedVehicle = useBookingStore((s) => s.selectedVehicle);
  const setVehicle = useBookingStore((s) => s.setVehicle);
  const nextStep = useBookingStore((s) => s.nextStep);

  return (
    <div className="w-full">
      <p className="mb-3 font-ui text-sm uppercase tracking-[0.3em] text-luxury-gold">
        Step 1 — Select
      </p>
      <h2 className="mb-10 font-display text-4xl font-bold tracking-tighter md:text-6xl">
        Choose your vehicle
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FLEET.map((v) => {
          const isSelected = selectedVehicle === v.name;
          return (
            <button
              key={v.name}
              onClick={() => setVehicle(v.name)}
              className={`group relative overflow-hidden rounded-2xl border p-6 text-left backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 ${
                isSelected
                  ? "border-luxury-gold bg-white/10 shadow-[0_0_50px_-12px_rgba(212,175,55,0.5)]"
                  : "border-white/10 bg-white/5 hover:border-white/25"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 font-ui text-xs uppercase tracking-widest text-white/60">
                  {v.category}
                </span>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs transition-all duration-500 ${
                    isSelected
                      ? "border-luxury-gold bg-luxury-gold text-black"
                      : "border-white/20 text-transparent"
                  }`}
                >
                  ✓
                </span>
              </div>

              <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-white">
                {v.name}
              </h3>
              <p className="mt-1 font-body text-sm text-white/40">{v.tagline}</p>
              <p className="mt-4 font-ui text-sm text-white/70">
                {formatIDR(v.pricePerDay)}
                <span className="text-white/40"> / day</span>
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-12 flex justify-end">
        <button
          onClick={nextStep}
          disabled={!selectedVehicle}
          className="rounded-full bg-white px-10 py-4 font-ui text-sm font-semibold uppercase tracking-widest text-black transition-all duration-500 ease-out hover:bg-luxury-gold disabled:cursor-not-allowed disabled:opacity-30"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
