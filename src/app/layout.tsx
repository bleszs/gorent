import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Inter } from "next/font/google";
import SmoothScroll from "@/components/animations/SmoothScroll";
import LoadingScreen from "@/components/dom/LoadingScreen";
import Navbar from "@/components/dom/Navbar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Ganti bila domain final berubah (mis. domain kustom). Dipakai untuk
// mengubah path relatif OG/Twitter image menjadi URL absolut.
const SITE_URL = "https://gorent-seven.vercel.app";

// ≤125 karakter agar tak terpotong di preview sosial/mobile
const DESCRIPTION =
  "Sewa mobil & motor premium dengan pengalaman showroom sinematik. Booking cepat, asuransi termasuk, unlimited mileage.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // ~56 karakter → mengisi ruang SERP Google dengan baik (target 50–60)
    default: "GORENT — Premium Car & Motorcycle Rental | Drive Freedom",
    template: "%s · GORENT",
  },
  description: DESCRIPTION,
  keywords: [
    "rental mobil premium",
    "sewa motor",
    "luxury car rental",
    "motorcycle rental",
    "GORENT",
    "sewa mobil sport",
  ],
  authors: [{ name: "GORENT" }],
  creator: "GORENT",
  applicationName: "GORENT",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "GORENT",
    title: "GORENT — Drive Freedom",
    description: DESCRIPTION,
    locale: "id_ID",
    // og:image di-generate otomatis oleh src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "GORENT — Drive Freedom",
    description: DESCRIPTION,
    // twitter:image fallback ke opengraph-image.tsx
  },
  // Favicon & apple-touch di-generate otomatis oleh src/app/icon.tsx & apple-icon.tsx
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jakarta.variable} ${inter.variable}`}
    >
      <body className="bg-black font-body text-white antialiased">
        <SmoothScroll>
          <LoadingScreen />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
