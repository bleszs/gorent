"use client";

/* eslint-disable @next/next/no-img-element -- QR di-generate via API eksternal (placeholder sandbox) */

import { useState } from "react";
import { motion } from "framer-motion";
import { formatIDR } from "@/data/fleet";

interface PaymentSandboxProps {
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
}

type Status = "waiting" | "success";

export default function PaymentSandbox({
  amount,
  onSuccess,
  onClose,
}: PaymentSandboxProps) {
  const [status, setStatus] = useState<Status>("waiting");

  // QR placeholder (mengkodekan referensi booking palsu) — mensimulasikan QRIS.
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&data=${encodeURIComponent(
    `GORENT|QRIS|IDR${amount}|${Date.now()}`,
  )}`;

  const handleSimulate = () => {
    setStatus("success");
    // beri jeda dramatis lalu lanjut ke layar sukses akhir
    setTimeout(onSuccess, 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
      onClick={status === "waiting" ? onClose : undefined}
    >
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl"
      >
        {status === "waiting" ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-lg font-bold tracking-tight">
                QRIS
              </span>
              <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 font-ui text-[10px] uppercase tracking-widest text-white/50">
                Sandbox
              </span>
            </div>

            {/* QR di panel putih agar realistis */}
            <div className="mx-auto mb-6 w-fit rounded-2xl bg-white p-4">
              <img
                src={qrSrc}
                alt="QRIS payment code"
                width={240}
                height={240}
                className="h-52 w-52"
              />
            </div>

            <p className="font-ui text-sm uppercase tracking-widest text-white/40">
              Amount
            </p>
            <p className="mb-6 font-display text-3xl font-bold tracking-tighter text-luxury-gold">
              {formatIDR(amount)}
            </p>

            <div className="mb-6 flex items-center justify-center gap-2 font-ui text-sm text-white/60">
              <span className="h-2 w-2 animate-ping rounded-full bg-luxury-gold" />
              Waiting for payment…
            </div>

            <button
              onClick={handleSimulate}
              className="w-full rounded-full bg-luxury-gold py-4 font-ui text-sm font-semibold uppercase tracking-widest text-black transition-all duration-500 ease-out hover:shadow-[0_0_50px_-10px_rgba(212,175,55,0.7)]"
            >
              Simulate Success
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full py-2 font-ui text-xs uppercase tracking-widest text-white/40 transition-colors duration-500 hover:text-white/70"
            >
              Cancel
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-10"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-luxury-gold/40 bg-luxury-gold/10 text-3xl text-luxury-gold">
              ✓
            </div>
            <p className="font-display text-2xl font-bold tracking-tight">
              Payment Successful
            </p>
            <p className="mt-2 font-ui text-sm text-white/40">Redirecting…</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
