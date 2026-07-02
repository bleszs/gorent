// Data kendaraan terpusat (dipakai booking flow; bisa juga dipakai FleetUI).
export interface Vehicle {
  name: string;
  category: "Car" | "Motorcycle";
  tagline: string;
  pricePerDay: number; // IDR / hari
  model: string; // path .glb di public/models/
}

// Urutan model di carousel FleetScene mengikuti urutan array ini.
export const FLEET: Vehicle[] = [
  { name: "SUV", category: "Car", tagline: "Command every terrain", pricePerDay: 850000, model: "/models/suv.glb" },
  { name: "Sedan", category: "Car", tagline: "Refined city elegance", pricePerDay: 650000, model: "/models/sedan.glb" },
  { name: "Luxury", category: "Car", tagline: "First-class on wheels", pricePerDay: 2500000, model: "/models/luxury.glb" },
  { name: "Sports Car", category: "Car", tagline: "Adrenaline, engineered", pricePerDay: 3500000, model: "/models/sports-car.glb" },
  { name: "Scooter", category: "Motorcycle", tagline: "Effortless urban glide", pricePerDay: 150000, model: "/models/scooter.glb" },
  { name: "Sport Bike", category: "Motorcycle", tagline: "Pure raw velocity", pricePerDay: 500000, model: "/models/sport-bike.glb" },
  { name: "Adventure Bike", category: "Motorcycle", tagline: "Chase the horizon", pricePerDay: 750000, model: "/models/adventure-bike.glb" },
];

export const getVehicle = (name: string | null) =>
  FLEET.find((v) => v.name === name) ?? null;

export const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
