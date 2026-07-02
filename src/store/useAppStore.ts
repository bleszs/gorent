import { create } from "zustand";
import type Lenis from "lenis";

/**
 * State global aplikasi (non-3D).
 * - `isLoaded`: di-set true oleh LoadingScreen setelah tirai tergeser naik → Navbar slide-down.
 * - `lenis`: instance Lenis dibagikan agar Navbar bisa `lenis.scrollTo()` (anchor mulus).
 */
interface AppState {
  isLoaded: boolean;
  setLoaded: () => void;
  lenis: Lenis | null;
  setLenis: (lenis: Lenis | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoaded: false,
  setLoaded: () => set({ isLoaded: true }),
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
}));
