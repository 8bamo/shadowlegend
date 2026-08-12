import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
        }}
      >
        <div style={{ fontSize: 78, letterSpacing: -4, lineHeight: 1 }}>SL</div>
        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            letterSpacing: 5,
            opacity: 0.55,
          }}
        >
          SHADOW
        </div>
      </div>
    ),
    size,
  );
}
