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
  setHeroProgress: (value: number) => void;
  setFleetProgress: (value: number) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  heroProgress: 0,
  fleetProgress: 0,
  setHeroProgress: (value) => set({ heroProgress: value }),
  setFleetProgress: (value) => set({ fleetProgress: value }),
}));
