import { ImageResponse } from "next/og";

// Konvensi file Next.js → otomatis mengisi og:image (dan fallback twitter:image).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "GORENT — Drive Freedom";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // hitam pekat dengan sentuhan deep slate
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(1000px 600px at 50% 120%, #0F172A 0%, #000000 70%)",
          fontFamily: "sans-serif",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 190,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: -8,
            lineHeight: 1,
          }}
        >
          GORENT
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 38,
            color: "#a1a1aa",
            letterSpacing: -1,
            textAlign: "center",
          }}
        >
          Drive Freedom. Premium Car &amp; Motorcycle Rental.
        </div>

        {/* Aksen luxury gold */}
        <div
          style={{
            display: "flex",
            marginTop: 52,
            height: 4,
            width: 130,
            backgroundColor: "#D4AF37",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
