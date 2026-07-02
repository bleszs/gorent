import { ImageResponse } from "next/og";

// Konvensi file Next.js → otomatis jadi <link rel="icon"> (favicon)
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 7,
          fontFamily: "sans-serif",
        }}
      >
        G
      </div>
    ),
    { ...size },
  );
}
