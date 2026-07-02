"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { MathUtils } from "three";
import type { Group } from "three";
import { useSceneStore } from "@/store/useSceneStore";

const ITEM_COUNT = 7; // sejajar dengan jumlah kendaraan di FleetUI
const RADIUS = 3.4;

/**
 * PLACEHOLDER 3D carousel untuk section "Choose Your Ride".
 * - scale-in dari 0 mengikuti fleetProgress (muncul saat section masuk viewport).
 * - rotasi kontinu (spin) + tambahan rotasi dari scroll (fleetProgress).
 * - parallax tipis mengikuti posisi mouse (state.pointer -1..1), di-lerp.
 */
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
      {Array.from({ length: ITEM_COUNT }).map((_, i) => {
        const angle = (i / ITEM_COUNT) * Math.PI * 2;
        const x = Math.sin(angle) * RADIUS;
        const z = Math.cos(angle) * RADIUS;
        return (
          <Float key={i} speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
            <mesh position={[x, 0, z]} rotation={[0, angle, 0]}>
              <boxGeometry args={[1.4, 0.55, 0.85]} />
              <meshStandardMaterial
                color="#111827"
                metalness={0.9}
                roughness={0.15}
                envMapIntensity={1.4}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}
