import { create } from "zustand";

/**
 * State global aplikasi (non-3D).
 * `isLoaded` di-set true oleh LoadingScreen setelah tirai selesai tergeser naik,
 * dipakai Navbar untuk memicu animasi slide-down setelah reveal.
 */
interface AppState {
  isLoaded: boolean;
  setLoaded: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoaded: false,
  setLoaded: () => set({ isLoaded: true }),
}));
