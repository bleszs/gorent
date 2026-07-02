"use client";

import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { useSceneStore } from "@/store/useSceneStore";

/**
 * Menggerakkan kamera berdasarkan heroProgress (data scroll).
 * Kamera menarik mundur + naik + membentuk sedikit arc saat Hero di-scroll keluar,
 * lalu berhenti pada framing yang pas untuk menampilkan Fleet carousel.
 * Semua transisi di-lerp → gerak sinematik, tidak patah.
 */
export default function CameraRig() {
  useFrame((state) => {
    const { heroProgress } = useSceneStore.getState();

    const targetX = Math.sin(heroProgress * Math.PI) * 1.8; // arc mengelilingi lalu balik ke tengah
    const targetY = 0.6 + heroProgress * 1.4; // naik perlahan
    const targetZ = 7 + heroProgress * 4; // dolly mundur

    state.camera.position.x = MathUtils.lerp(state.camera.position.x, targetX, 0.06);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, targetY, 0.06);
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, targetZ, 0.06);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}
