"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  ContactShadows,
  RoundedBox,
} from "@react-three/drei";
import type { Mesh } from "three";

/**
 * PLACEHOLDER kendaraan — belum ada asset .glb.
 * RoundedBox metalik-gelap + Environment "city" → kesan bodi mobil glossy.
 */
function HeroObject() {
  const carMeshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!carMeshRef.current) return;
    // Rotasi kontinu halus (frame-rate independent via delta)
    carMeshRef.current.rotation.y += delta * 0.3;
    carMeshRef.current.rotation.x += delta * 0.05;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.8}>
      <RoundedBox
        ref={carMeshRef}
        args={[2.4, 2.4, 2.4]}
        radius={0.32}
        smoothness={8}
      >
        <meshStandardMaterial
          color="#0b0d12"
          metalness={1}
          roughness={0.12}
          envMapIntensity={1.6}
        />
      </RoundedBox>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]} // batasi pixel ratio → GPU aman di layar retina
      camera={{ position: [0, 0.6, 7], fov: 35 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <spotLight
          position={[6, 9, 5]}
          angle={0.3}
          penumbra={1}
          intensity={45}
          color="#3b82f6"
        />

        <HeroObject />

        {/* ContactShadows menggantikan real-time shadow demi performa */}
        <ContactShadows
          position={[0, -2.3, 0]}
          opacity={0.5}
          scale={14}
          blur={3}
          far={5}
        />

        {/* Pencahayaan studio realistis + refleksi untuk material metalik */}
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
