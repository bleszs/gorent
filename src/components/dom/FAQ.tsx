"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface QA {
  q: string;
  a: string;
}

const FAQS: QA[] = [
  {
    q: "What do I need to rent a vehicle?",
    a: "A valid driver's license, a government-issued ID, and a credit card under your name. That's it — the rest is on us.",
  },
  {
    q: "Is insurance really included?",
    a: "Yes. Every booking comes with full coverage baked in. No hidden add-ons, no fine print at pickup.",
  },
  {
    q: "Can I extend my rental period?",
    a: "Absolutely. Extend directly from the app in seconds, subject to vehicle availability.",
  },
  {
    q: "Do you offer delivery and pickup?",
    a: "We deliver to your hotel, airport, or address in supported cities — detailed and ready to drive.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Free cancellation up to 24 hours before pickup. Life happens — we keep it flexible.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto w-full max-w-4xl px-6 md:px-10">
      <header className="mb-16">
        <p className="mb-4 font-ui text-sm uppercase tracking-[0.3em] text-luxury-gold">
          Good to know
        </p>
        <h2 className="font-display text-5xl font-bold tracking-tighter md:text-7xl">
          Frequently asked
        </h2>
      </header>

      <div className="border-t border-white/10">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.q} className="border-b border-white/10">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-7 text-left transition-colors duration-500 ease-out hover:text-luxury-gold"
                aria-expanded={isOpen}
              >
                <span className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 text-2xl text-luxury-gold"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-7 font-body leading-relaxed text-white/55">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
