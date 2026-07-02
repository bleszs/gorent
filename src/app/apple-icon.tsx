import { ImageResponse } from "next/og";

// Konvensi file Next.js → <link rel="apple-touch-icon"> (ikon home-screen iOS).
// Latar solid (bukan transparan) sesuai rekomendasi Apple.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#ffffff",
          fontSize: 120,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        G
      </div>
    ),
    { ...size },
  );
}
