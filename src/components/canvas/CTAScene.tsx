"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

/**
 * Canvas LOKAL (bukan GlobalCanvas) khusus section CTA.
 * Karena CTA duduk di atas backdrop hitam solid yang menutupi GlobalCanvas,
 * partikel butuh context tersendiri di sini. Sparkles bergerak pelan sendiri
 * (prop `speed`), jadi tak perlu useFrame → hemat & "magis".
 */
export default function CTAScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <Sparkles
        count={120}
        scale={[13, 8, 6]}
        size={3}
        speed={0.4}
        opacity={0.8}
        color="#D4AF37"
      />
      <Sparkles
        count={90}
        scale={[15, 10, 6]}
        size={2}
        speed={0.3}
        opacity={0.55}
        color="#3B82F6"
      />
    </Canvas>
  );
}
