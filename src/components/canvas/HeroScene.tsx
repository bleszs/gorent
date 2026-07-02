"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Center, Resize, useGLTF } from "@react-three/drei";
import { MathUtils } from "three";
import type { Group } from "three";
import { useSceneStore } from "@/store/useSceneStore";

const MODEL_URL = "/models/car.glb";
const HERO_MODEL_SCALE = 3; // ukuran akhir (unit dunia) SETELAH dinormalisasi Resize → tweak di sini

/**
 * Model kendaraan Hero (aset asli).
 * DRACO decoder diambil dari CDN gstatic (arg `true`) — tak perlu file lokal.
 * Ganti `true` → "/draco/" bila kamu menaruh decoder di public/draco/.
 */
function CarModel() {
  const { scene } = useGLTF(MODEL_URL, true);
  return <primitive object={scene} />;
}
// Pra-muat lewat loading manager → LoadingScreen (useProgress) menghitung bobot model.
useGLTF.preload(MODEL_URL, true);

function HeroObject() {
  const groupRef = useRef<Group>(null); // fly-away saat scroll
  const modelRef = useRef<Group>(null); // rotasi kontinu

  useFrame((_, delta) => {
    const { heroProgress } = useSceneStore.getState();

    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.3; // spin sinematik (frame-rate independent)
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
        {/* modelRef: pivot rotasi. Center+Resize → apa pun native origin/ukuran model,
            hasilnya ternormalisasi & terpusat di titik nol. */}
        <group ref={modelRef} scale={HERO_MODEL_SCALE}>
          <Center>
            <Resize>
              <CarModel />
            </Resize>
          </Center>
        </group>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return <HeroObject />;
}
