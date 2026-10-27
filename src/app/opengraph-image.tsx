import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07070B",
          color: "#F4F4F7",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 8, color: "#C4B5FD" }}>SHIVONIX</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, lineHeight: 1.02, letterSpacing: -1.5, maxWidth: 920 }}>
            Ideas into digital experiences.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#C8C8D8" }}>Jyoti Agarwal</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
