"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import Magnetic from "@/components/animations/Magnetic";

const LINKS = [
  { label: "Fleet", href: "#fleet" },
  { label: "Destinations", href: "#destinations" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const isLoaded = useAppStore((s) => s.isLoaded);

  return (
    <motion.header
      initial={{ y: -120 }}
      animate={{ y: isLoaded ? 0 : -120 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 md:px-10">
        {/* Logo */}
        <a
          href="#hero"
          className="font-display text-xl font-bold tracking-tighter text-white transition-opacity duration-500 hover:opacity-70"
        >
          GORENT
        </a>

        {/* Navigasi tengah (glassmorphism pill) */}
        <nav className="hidden items-center gap-8 rounded-full border border-white/10 bg-white/5 px-8 py-3 backdrop-blur-md md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-ui text-sm text-white/70 transition-colors duration-500 ease-out hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA magnetic */}
        <Magnetic className="inline-block" strength={0.5}>
          <button className="rounded-full bg-white px-6 py-3 font-ui text-sm font-semibold uppercase tracking-widest text-black transition-all duration-500 ease-out hover:bg-luxury-gold hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.6)]">
            Rent Now
          </button>
        </Magnetic>
      </div>
    </motion.header>
  );
}
