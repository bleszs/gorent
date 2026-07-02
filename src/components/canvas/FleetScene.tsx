"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Center, Resize, useGLTF } from "@react-three/drei";
import { MathUtils } from "three";
import type { Group } from "three";
import { useSceneStore } from "@/store/useSceneStore";

const RADIUS = 3.4; // jari-jari lingkaran carousel
const ITEM_SCALE = 1.4; // ukuran tiap model SETELAH dinormalisasi Resize → tweak di sini

/**
 * Urutan WAJIB sinkron dengan daftar di FleetUI.tsx.
 * Ganti nama file sesuai aset yang kamu taruh di public/models/.
 */
const FLEET_MODELS = [
  "/models/suv.glb",
  "/models/sedan.glb",
  "/models/luxury.glb",
  "/models/sports-car.glb",
  "/models/scooter.glb",
  "/models/sport-bike.glb",
  "/models/adventure-bike.glb",
];

// Pra-muat semua → dihitung LoadingScreen (useProgress). true = DRACO via CDN gstatic.
FLEET_MODELS.forEach((url) => useGLTF.preload(url, true));

/** Satu model: hook useGLTF dipanggil per-instance (bukan di dalam loop). */
function FleetModel({ url }: { url: string }) {
  const { scene } = useGLTF(url, true);
  // Center + Resize → apa pun native origin/ukuran model, jadi ternormalisasi & terpusat.
  return (
    <Center>
      <Resize>
        <primitive object={scene} />
      </Resize>
    </Center>
  );
}

export default function FleetScene() {
  const groupRef = useRef<Group>(null);
  const spin = useRef(0); // akumulator rotasi kontinu (dipisah dari offset scroll)

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const { fleetProgress } = useSceneStore.getState();

    // Muncul/menghilang mengikuti scroll
    const s = MathUtils.lerp(groupRef.current.scale.x, fleetProgress, 0.08);
    groupRef.current.scale.setScalar(s);

    // Spin kontinu + rotasi ekstra saat di-scroll
    spin.current += delta * 0.15;
    groupRef.current.rotation.y = spin.current + fleetProgress * Math.PI;

    // Parallax mouse (tilt + geser halus)
    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.15,
      0.05,
    );
    groupRef.current.position.x = MathUtils.lerp(
      groupRef.current.position.x,
      state.pointer.x * 0.5,
      0.05,
    );
  });

  return (
    <group ref={groupRef} scale={0}>
      {FLEET_MODELS.map((url, i) => {
        const angle = (i / FLEET_MODELS.length) * Math.PI * 2;
        const x = Math.sin(angle) * RADIUS;
        const z = Math.cos(angle) * RADIUS;
        return (
          <Float key={url} speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
            {/* rotation Y = angle → tiap kendaraan menghadap keluar dari pusat.
                Jika ada model yang menghadap arah salah, tambah offset, mis. [0, angle + Math.PI, 0]. */}
            <group position={[x, 0, z]} rotation={[0, angle, 0]} scale={ITEM_SCALE}>
              <FleetModel url={url} />
            </group>
          </Float>
        );
      })}
    </group>
  );
}
