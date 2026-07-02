import { create } from "zustand";

/**
 * State jembatan Scroll(DOM) → Canvas(3D).
 * Ditulis oleh SceneScrollTriggers (ScrollTrigger onUpdate),
 * dibaca oleh komponen canvas via `useSceneStore.getState()` di dalam useFrame
 * agar TIDAK memicu re-render React tiap frame scroll.
 */
interface SceneState {
  heroProgress: number; // 0..1 selama section Hero di-scroll keluar
  fleetProgress: number; // 0..1 saat section Fleet masuk viewport
  heroRotation: number; // radian tambahan dari drag pengguna pada mobil Hero
  showFleet: boolean; // true saat user mendekati Fleet → baru load 7 model .glb
  setHeroProgress: (value: number) => void;
  setFleetProgress: (value: number) => void;
  rotateHero: (deltaRad: number) => void;
  setShowFleet: (value: boolean) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  heroProgress: 0,
  fleetProgress: 0,
  heroRotation: 0,
  showFleet: false,
  setHeroProgress: (value) => set({ heroProgress: value }),
  setFleetProgress: (value) => set({ fleetProgress: value }),
  rotateHero: (deltaRad) =>
    set((s) => ({ heroRotation: s.heroRotation + deltaRad })),
  setShowFleet: (value) => set({ showFleet: value }),
}));
