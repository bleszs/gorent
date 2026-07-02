import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type BookingStep = 1 | 2 | 3;

/**
 * State alur pemesanan, di-persist ke localStorage agar tak hilang saat refresh.
 *
 * Anti hydration-mismatch (Next.js App Router):
 * - `skipHydration: true` → store TIDAK auto-rehydrate saat dibuat, sehingga
 *   render pertama di client == render server (sama-sama state awal).
 * - Halaman /book memanggil `useBookingStore.persist.rehydrate()` di useEffect,
 *   lalu `_hasHydrated` menjadi true → aman untuk merender state yang dipulihkan.
 */
interface BookingState {
  step: BookingStep;
  selectedVehicle: string | null;
  bookingDate: string | null; // tanggal pick-up (YYYY-MM-DD)
  returnDate: string | null; // tanggal kembali (YYYY-MM-DD)
  _hasHydrated: boolean;

  setHasHydrated: (value: boolean) => void;
  setVehicle: (name: string) => void;
  setDates: (pickup: string | null, ret: string | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  startBooking: (vehicle?: string | null) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      step: 1,
      selectedVehicle: null,
      bookingDate: null,
      returnDate: null,
      _hasHydrated: false,

      setHasHydrated: (value) => set({ _hasHydrated: value }),
      setVehicle: (name) => set({ selectedVehicle: name }),
      setDates: (pickup, ret) => set({ bookingDate: pickup, returnDate: ret }),
      nextStep: () =>
        set((s) => ({ step: Math.min(3, s.step + 1) as BookingStep })),
      prevStep: () =>
        set((s) => ({ step: Math.max(1, s.step - 1) as BookingStep })),
      startBooking: (vehicle = null) =>
        set({ step: 1, selectedVehicle: vehicle, bookingDate: null, returnDate: null }),
      reset: () =>
        set({ step: 1, selectedVehicle: null, bookingDate: null, returnDate: null }),
    }),
    {
      name: "gorent-booking",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // rehydrate manual → cegah mismatch SSR
      // hanya persist data booking (bukan fungsi / flag hydration)
      partialize: (s) => ({
        step: s.step,
        selectedVehicle: s.selectedVehicle,
        bookingDate: s.bookingDate,
        returnDate: s.returnDate,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
