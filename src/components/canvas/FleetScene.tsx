"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useFrame } from "@react-three/fiber";
import { Float, Center, Resize, useGLTF } from "@react-three/drei";
import { MathUtils } from "three";
import type { Group } from "three";
import { useSceneStore } from "@/store/useSceneStore";
import { useBookingStore } from "@/store/useBookingStore";
import { FLEET } from "@/data/fleet";

const RADIUS = 3.4; // jari-jari lingkaran carousel
const ITEM_SCALE = 1.4; // ukuran tiap model SETELAH dinormalisasi Resize → tweak di sini

// Pra-muat semua model → dihitung LoadingScreen (useProgress). true = DRACO via CDN.
FLEET.forEach((v) => useGLTF.preload(v.model, true));

/** Satu model: hook useGLTF dipanggil per-instance (bukan di dalam loop). */
function FleetModel({ url }: { url: string }) {
  const { scene } = useGLTF(url, true);
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
  const spin = useRef(0);
  const router = useRouter();
  const startBooking = useBookingStore((s) => s.startBooking);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const { fleetProgress } = useSceneStore.getState();

    const s = MathUtils.lerp(groupRef.current.scale.x, fleetProgress, 0.08);
    groupRef.current.scale.setScalar(s);

    spin.current += delta * 0.15;
    groupRef.current.rotation.y = spin.current + fleetProgress * Math.PI;

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

  // Klik model 3D → pre-select + navigasi ke /book
  const handleSelect = (name: string) => {
    startBooking(name);
    router.push("/book");
  };

  return (
    <group ref={groupRef} scale={0}>
      {FLEET.map((vehicle, i) => {
        const angle = (i / FLEET.length) * Math.PI * 2;
        const x = Math.sin(angle) * RADIUS;
        const z = Math.cos(angle) * RADIUS;
        return (
          <Float key={vehicle.name} speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
            <group
              position={[x, 0, z]}
              rotation={[0, angle, 0]}
              scale={ITEM_SCALE}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(vehicle.name);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto";
              }}
            >
              <FleetModel url={vehicle.model} />
            </group>
          </Float>
        );
      })}
    </group>
  );
}
