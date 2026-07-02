"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useBookingStore } from "@/store/useBookingStore";
import { getVehicle, formatIDR } from "@/data/fleet";
import PaymentSandbox from "./PaymentSandbox";

const DAY_MS = 86_400_000;

export default function Step3Confirm() {
  const selectedVehicle = useBookingStore((s) => s.selectedVehicle);
  const bookingDate = useBookingStore((s) => s.bookingDate);
  const returnDate = useBookingStore((s) => s.returnDate);
  const prevStep = useBookingStore((s) => s.prevStep);
  const reset = useBookingStore((s) => s.reset);

  const [confirmed, setConfirmed] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const vehicle = getVehicle(selectedVehicle);
  const days =
    bookingDate && returnDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(returnDate).getTime() - new Date(bookingDate).getTime()) /
              DAY_MS,
          ),
        )
      : 0;
  const total = vehicle ? vehicle.pricePerDay * days : 0;

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-luxury-gold/40 bg-luxury-gold/10 text-4xl text-luxury-gold">
          ✓
        </div>
        <h2 className="font-display text-4xl font-bold tracking-tighter md:text-6xl">
          Booking Confirmed
        </h2>
        <p className="mt-4 max-w-md font-body text-white/50">
          Your {vehicle?.name} is reserved. A concierge will reach out shortly
          to finalize the details. Drive freedom.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/"
            className="rounded-full bg-white px-8 py-4 font-ui text-sm font-semibold uppercase tracking-widest text-black transition-all duration-500 ease-out hover:bg-luxury-gold"
          >
            Back to Home
          </Link>
          <button
            onClick={() => {
              reset();
              setConfirmed(false);
            }}
            className="rounded-full border border-white/15 px-8 py-4 font-ui text-sm uppercase tracking-widest text-white/70 transition-all duration-500 ease-out hover:border-white/40 hover:text-white"
          >
            Book Another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <p className="mb-3 font-ui text-sm uppercase tracking-[0.3em] text-luxury-gold">
        Step 3 — Confirm
      </p>
      <h2 className="mb-10 font-display text-4xl font-bold tracking-tighter md:text-6xl">
        Review your booking
      </h2>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10">
        <Row label="Vehicle" value={vehicle?.name ?? "—"} />
        <Row label="Category" value={vehicle?.category ?? "—"} />
        <Row label="Pick-up" value={bookingDate ?? "—"} />
        <Row label="Return" value={returnDate ?? "—"} />
        <Row label="Duration" value={`${days} day${days > 1 ? "s" : ""}`} />
        <Row
          label="Rate"
          value={vehicle ? `${formatIDR(vehicle.pricePerDay)} / day` : "—"}
        />

        <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-6">
          <span className="font-ui text-sm uppercase tracking-widest text-white/50">
            Estimated Total
          </span>
          <span className="font-display text-4xl font-bold tracking-tighter text-luxury-gold">
            {formatIDR(total)}
          </span>
        </div>
      </div>

      <div className="mt-12 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={prevStep}
          className="rounded-full border border-white/15 px-8 py-4 font-ui text-sm uppercase tracking-widest text-white/70 transition-all duration-500 ease-out hover:border-white/40 hover:text-white"
        >
          ← Back
        </button>
        <button
          onClick={() => setShowPayment(true)}
          className="rounded-full bg-luxury-gold px-12 py-5 font-ui text-sm font-semibold uppercase tracking-widest text-black transition-all duration-500 ease-out hover:shadow-[0_0_60px_-10px_rgba(212,175,55,0.7)]"
        >
          Confirm &amp; Pay
        </button>
      </div>

      {/* Simulasi payment gateway (QRIS sandbox) */}
      <AnimatePresence>
        {showPayment && (
          <PaymentSandbox
            amount={total}
            onClose={() => setShowPayment(false)}
            onSuccess={() => {
              setShowPayment(false);
              setConfirmed(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="font-ui text-sm uppercase tracking-widest text-white/40">
        {label}
      </span>
      <span className="font-body text-lg text-white">{value}</span>
    </div>
  );
}
