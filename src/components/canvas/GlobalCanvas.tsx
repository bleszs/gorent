"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import CameraRig from "./CameraRig";
import HeroScene from "./HeroScene";
import FleetScene from "./FleetScene";
import { useSceneStore } from "@/store/useSceneStore";

/**
 * Satu-satunya <Canvas> di aplikasi (satu WebGL context = performa optimal).
 * Menampung seluruh objek 3D lintas-section: Hero, Fleet, dan kamera scroll-driven.
 */
export default function GlobalCanvas() {
  // Fleet (7 model, ~10 MB) hanya di-mount saat user mendekati section-nya →
  // initial load hanya memuat mobil Hero + HDRI, bukan seluruh armada.
  const showFleet = useSceneStore((s) => s.showFleet);

  return (
    <Canvas
      dpr={[1, 2]} // batasi pixel ratio → GPU aman di layar retina
      camera={{ position: [0, 0.6, 7], fov: 35 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <CameraRig />

        <ambientLight intensity={0.35} />
        <spotLight
          position={[6, 9, 5]}
          angle={0.3}
          penumbra={1}
          intensity={45}
          color="#3b82f6"
        />

        <HeroScene />
        {showFleet && <FleetScene />}

        {/* ContactShadows menggantikan real-time shadow demi performa */}
        <ContactShadows
          position={[0, -2.3, 0]}
          opacity={0.5}
          scale={16}
          blur={3}
          far={5}
        />

        {/* Pencahayaan studio + refleksi untuk material metalik */}
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
