"use client";

import { useRef } from "react";
import { useSceneStore } from "@/store/useSceneStore";

/**
 * Lapisan penangkap drag di area Hero (DOM). Drag horizontal → memutar mobil 360°.
 * DOM yang menangkap event (bukan canvas) agar andal menembus arsitektur overlay.
 * touch-pan-y → scroll vertikal di HP tetap jalan; drag horizontal untuk rotasi.
 */
export default function HeroDragLayer() {
  const rotateHero = useSceneStore((s) => s.rotateHero);
  const dragging = useRef(false);
  const lastX = useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    rotateHero(dx * 0.01); // ~100px drag ≈ 1 radian
  };

  const stop = () => {
    dragging.current = false;
  };

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      className="absolute inset-0 z-0 touch-pan-y cursor-grab active:cursor-grabbing"
      aria-hidden
    />
  );
}
