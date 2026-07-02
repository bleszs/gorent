"use client";

/* eslint-disable @next/next/no-img-element -- avatar placeholder (pravatar) pakai <img> mentah */

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useBookingStore, type BookingRecord } from "@/store/useBookingStore";
import { formatIDR } from "@/data/fleet";

const USER = {
  name: "Gregorian Sinaga",
  email: "gregorian.sinaga@gmail.com",
  avatar: 13, // pravatar id
  memberSince: "2024",
};

const today = new Date().toISOString().split("T")[0];

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ProfilePage() {
  const bookingHistory = useBookingStore((s) => s.bookingHistory);
  const hasHydrated = useBookingStore((s) => s._hasHydrated);
  const [tab, setTab] = useState<"active" | "past">("active");

  useEffect(() => {
    useBookingStore.persist.rehydrate();
  }, []);

  if (!hasHydrated) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-black">
        <p className="animate-pulse font-ui text-sm uppercase tracking-[0.3em] text-white/40">
          Loading…
        </p>
      </main>
    );
  }

  const active = bookingHistory.filter((b) => b.returnDate >= today);
  const past = bookingHistory.filter((b) => b.returnDate < today);
  const list = tab === "active" ? active : past;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Aurora halus */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-electric-blue/15 blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-luxury-gold/10 blur-[150px]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-10 md:px-10">
        <header className="mb-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tighter transition-opacity duration-500 hover:opacity-70"
          >
            GORENT
          </Link>
          <Link
            href="/"
            className="font-ui text-sm text-white/50 transition-colors duration-500 hover:text-white"
          >
            ← Back to Home
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Kartu profil */}
          <aside className="lg:col-span-1">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <div className="flex flex-col items-center text-center">
                <img
                  src={`https://i.pravatar.cc/160?img=${USER.avatar}`}
                  alt={USER.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full border border-white/20 object-cover"
                />
                <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">
                  {USER.name}
                </h1>
                <p className="mt-1 font-body text-sm text-white/50">
                  {USER.email}
                </p>
                <span className="mt-4 rounded-full border border-white/10 bg-black/30 px-4 py-1 font-ui text-xs uppercase tracking-widest text-luxury-gold">
                  Member since {USER.memberSince}
                </span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                <Stat label="Active" value={active.length} />
                <Stat label="Completed" value={past.length} />
              </div>
            </div>
          </aside>

          {/* Riwayat booking */}
          <section className="lg:col-span-2">
            {/* Tabs */}
            <div className="mb-8 flex gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md">
              {(["active", "past"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative flex-1 rounded-full px-6 py-3 font-ui text-sm uppercase tracking-widest transition-colors duration-300 ${
                    tab === t ? "text-black" : "text-white/50 hover:text-white"
                  }`}
                >
                  {tab === t && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">
                    {t === "active" ? "Active Booking" : "Past History"}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {list.length === 0 ? (
                  <EmptyState tab={tab} />
                ) : (
                  <motion.div
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                    className="grid gap-4"
                  >
                    {list.map((b) => (
                      <motion.div key={b.id} variants={itemVariants}>
                        <BookingCard record={b} active={tab === "active"} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="font-display text-3xl font-bold tracking-tighter text-white">
        {value}
      </p>
      <p className="mt-1 font-ui text-xs uppercase tracking-widest text-white/40">
        {label}
      </p>
    </div>
  );
}

function BookingCard({
  record,
  active,
}: {
  record: BookingRecord;
  active: boolean;
}) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-500 ease-out hover:border-white/25 md:p-7">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 font-ui text-xs uppercase tracking-widest text-white/60">
              {record.category}
            </span>
            <span
              className={`rounded-full px-3 py-1 font-ui text-xs uppercase tracking-widest ${
                active
                  ? "bg-luxury-gold/15 text-luxury-gold"
                  : "bg-white/10 text-white/50"
              }`}
            >
              {active ? "Active" : "Completed"}
            </span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white">
            {record.vehicle}
          </h3>
          <p className="mt-2 font-body text-sm text-white/50">
            {formatDate(record.pickupDate)} → {formatDate(record.returnDate)}
            <span className="text-white/30">
              {" "}
              · {record.days} day{record.days > 1 ? "s" : ""}
            </span>
          </p>
        </div>

        <div className="text-right">
          <p className="font-display text-2xl font-bold tracking-tighter text-luxury-gold">
            {formatIDR(record.total)}
          </p>
          <p className="mt-1 font-ui text-xs uppercase tracking-widest text-white/30">
            {record.id}
          </p>
        </div>
      </div>
    </article>
  );
}

function EmptyState({ tab }: { tab: "active" | "past" }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] py-20 text-center">
      <p className="font-display text-2xl font-semibold tracking-tight text-white/80">
        {tab === "active" ? "No active bookings" : "No past trips yet"}
      </p>
      <p className="mt-2 max-w-xs font-body text-sm text-white/40">
        {tab === "active"
          ? "Your upcoming rides will appear here."
          : "Completed rentals will be archived here."}
      </p>
      <Link
        href="/book"
        className="mt-8 rounded-full bg-white px-8 py-3.5 font-ui text-sm font-semibold uppercase tracking-widest text-black transition-all duration-500 ease-out hover:bg-luxury-gold"
      >
        Book a Ride
      </Link>
    </div>
  );
}
