"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { MathUtils } from "three";
import type { Group, Mesh } from "three";
import { useSceneStore } from "@/store/useSceneStore";

/**
 * PLACEHOLDER kendaraan Hero (belum ada asset .glb).
 * - meshRef: rotasi kontinu halus (useFrame).
 * - groupRef: "terbang" naik & mengecil saat Hero di-scroll keluar (heroProgress),
 *   sehingga panggung kosong saat Storytelling & memberi ruang untuk Fleet.
 *
 * Catatan: komponen ini TIDAK memiliki <Canvas> sendiri — ia dirender
 * di dalam GlobalCanvas (satu WebGL context untuk seluruh halaman).
 */
export default function HeroScene() {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    const { heroProgress } = useSceneStore.getState();

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3; // frame-rate independent
      meshRef.current.rotation.x += delta * 0.05;
    }

    if (groupRef.current) {
      const targetY = heroProgress * 4; // terbang naik keluar frame
      const targetScale = 1 - heroProgress * 0.85; // mengecil hingga ~0.15
      groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
      const s = MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08);
      groupRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.8}>
        <RoundedBox ref={meshRef} args={[2.4, 2.4, 2.4]} radius={0.32} smoothness={8}>
          <meshStandardMaterial
            color="#0b0d12"
            metalness={1}
            roughness={0.12}
            envMapIntensity={1.6}
          />
        </RoundedBox>
      </Float>
    </group>
  );
}
