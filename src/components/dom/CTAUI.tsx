"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/animations/Magnetic";

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function CTAUI() {
  return (
    <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
      <motion.p
        custom={0}
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-6 font-ui text-sm uppercase tracking-[0.3em] text-luxury-gold"
      >
        Ready when you are
      </motion.p>

      <motion.h2
        custom={1}
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="font-display text-5xl font-bold leading-[0.95] tracking-tighter md:text-7xl lg:text-8xl"
      >
        Your Next Adventure
        <br />
        <span className="bg-gradient-to-r from-electric-blue via-white to-luxury-gold bg-clip-text text-transparent">
          Starts Here
        </span>
      </motion.h2>

      <motion.div
        custom={2}
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-12"
      >
        <Magnetic className="inline-block" strength={0.5}>
          <button className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 font-ui text-sm font-semibold uppercase tracking-widest text-black transition-all duration-500 ease-out hover:bg-luxury-gold hover:shadow-[0_0_60px_-10px_rgba(212,175,55,0.6)]">
            Book Your Ride
            <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">
              →
            </span>
          </button>
        </Magnetic>
      </motion.div>
    </div>
  );
}
