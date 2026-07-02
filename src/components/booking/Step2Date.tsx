"use client";

import { useBookingStore } from "@/store/useBookingStore";
import { getVehicle, formatIDR } from "@/data/fleet";

const today = new Date().toISOString().split("T")[0];

export default function Step2Date() {
  const selectedVehicle = useBookingStore((s) => s.selectedVehicle);
  const bookingDate = useBookingStore((s) => s.bookingDate);
  const returnDate = useBookingStore((s) => s.returnDate);
  const setDates = useBookingStore((s) => s.setDates);
  const nextStep = useBookingStore((s) => s.nextStep);
  const prevStep = useBookingStore((s) => s.prevStep);

  const vehicle = getVehicle(selectedVehicle);
  const datesValid =
    !!bookingDate && !!returnDate && returnDate > bookingDate;

  return (
    <div className="w-full">
      <p className="mb-3 font-ui text-sm uppercase tracking-[0.3em] text-luxury-gold">
        Step 2 — Schedule
      </p>
      <h2 className="mb-10 font-display text-4xl font-bold tracking-tighter md:text-6xl">
        Pick your dates
      </h2>

      {/* Ringkasan kendaraan terpilih */}
      {vehicle && (
        <div className="mb-10 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <div>
            <p className="font-ui text-xs uppercase tracking-widest text-white/40">
              {vehicle.category}
            </p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-tight">
              {vehicle.name}
            </p>
          </div>
          <p className="font-ui text-sm text-white/70">
            {formatIDR(vehicle.pricePerDay)}
            <span className="text-white/40"> / day</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-3">
          <span className="font-ui text-sm uppercase tracking-widest text-white/50">
            Pick-up date
          </span>
          <input
            type="date"
            min={today}
            value={bookingDate ?? ""}
            onChange={(e) => setDates(e.target.value, returnDate)}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 font-body text-lg text-white backdrop-blur-md transition-colors duration-500 [color-scheme:dark] focus:border-luxury-gold focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-3">
          <span className="font-ui text-sm uppercase tracking-widest text-white/50">
            Return date
          </span>
          <input
            type="date"
            min={bookingDate ?? today}
            value={returnDate ?? ""}
            onChange={(e) => setDates(bookingDate, e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 font-body text-lg text-white backdrop-blur-md transition-colors duration-500 [color-scheme:dark] focus:border-luxury-gold focus:outline-none"
          />
        </label>
      </div>

      {bookingDate && returnDate && !datesValid && (
        <p className="mt-4 font-ui text-sm text-red-400/80">
          Return date must be after the pick-up date.
        </p>
      )}

      <div className="mt-12 flex justify-between">
        <button
          onClick={prevStep}
          className="rounded-full border border-white/15 px-8 py-4 font-ui text-sm uppercase tracking-widest text-white/70 transition-all duration-500 ease-out hover:border-white/40 hover:text-white"
        >
          ← Back
        </button>
        <button
          onClick={nextStep}
          disabled={!datesValid}
          className="rounded-full bg-white px-10 py-4 font-ui text-sm font-semibold uppercase tracking-widest text-black transition-all duration-500 ease-out hover:bg-luxury-gold disabled:cursor-not-allowed disabled:opacity-30"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
