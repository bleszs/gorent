"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Center, Resize, useGLTF } from "@react-three/drei";
import { MathUtils } from "three";
import type { Group } from "three";
import { useSceneStore } from "@/store/useSceneStore";

const MODEL_URL = "/models/car.glb";
const HERO_MODEL_SCALE = 4.4; // diperbesar agar mobil dominan ("full") → tweak di sini

function CarModel() {
  const { scene } = useGLTF(MODEL_URL, true); // true = DRACO via CDN
  return <primitive object={scene} />;
}
useGLTF.preload(MODEL_URL, true);

function HeroObject() {
  const groupRef = useRef<Group>(null); // fly-away saat scroll (posisi + skala)
  const modelRef = useRef<Group>(null); // rotasi (idle spin + drag pengguna)
  const idleSpin = useRef(0);

  useFrame((_, delta) => {
    const { heroProgress, heroRotation } = useSceneStore.getState();

    if (modelRef.current) {
      idleSpin.current += delta * 0.15; // spin lembut saat idle
      // rotasi total = spin idle + offset drag pengguna (dari HeroDragLayer)
      modelRef.current.rotation.y = idleSpin.current + heroRotation;
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
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
        <group ref={modelRef} scale={HERO_MODEL_SCALE}>
          {/* Center + Resize → normalisasi ukuran/pivot model apa pun */}
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
