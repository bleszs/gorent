import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getVehicle } from "@/data/fleet";

export type BookingStep = 1 | 2 | 3;

export interface BookingRecord {
  id: string;
  vehicle: string;
  category: string;
  pickupDate: string;
  returnDate: string;
  days: number;
  total: number;
  createdAt: string; // ISO
}

const DAY_MS = 86_400_000;

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
  bookingHistory: BookingRecord[];
  _hasHydrated: boolean;

  setHasHydrated: (value: boolean) => void;
  setVehicle: (name: string) => void;
  setDates: (pickup: string | null, ret: string | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  startBooking: (vehicle?: string | null) => void;
  /** Rekam booking saat ini ke history, lalu reset form. */
  confirmBooking: () => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      step: 1,
      selectedVehicle: null,
      bookingDate: null,
      returnDate: null,
      bookingHistory: [],
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
      confirmBooking: () =>
        set((s) => {
          const vehicle = getVehicle(s.selectedVehicle);
          const base = {
            step: 1 as BookingStep,
            selectedVehicle: null,
            bookingDate: null,
            returnDate: null,
          };
          if (!vehicle || !s.bookingDate || !s.returnDate) return base;

          const days = Math.max(
            1,
            Math.ceil(
              (new Date(s.returnDate).getTime() -
                new Date(s.bookingDate).getTime()) /
                DAY_MS,
            ),
          );
          const record: BookingRecord = {
            id: `GR-${Date.now().toString(36).toUpperCase()}`,
            vehicle: vehicle.name,
            category: vehicle.category,
            pickupDate: s.bookingDate,
            returnDate: s.returnDate,
            days,
            total: vehicle.pricePerDay * days,
            createdAt: new Date().toISOString(),
          };
          return { ...base, bookingHistory: [record, ...s.bookingHistory] };
        }),
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
        bookingHistory: s.bookingHistory,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
