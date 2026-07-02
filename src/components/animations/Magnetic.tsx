"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  strength?: number; // 0..1, seberapa kuat tarikan ke kursor
  className?: string;
}

/**
 * Wrapper "magnetic": elemen di dalamnya tertarik halus ke arah kursor,
 * lalu kembali ke posisi semula (spring) saat mouse pergi.
 */
export default function Magnetic({
  children,
  strength = 0.4,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 150, damping: 15, mass: 0.3 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    // jarak kursor dari titik tengah elemen → offset
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
