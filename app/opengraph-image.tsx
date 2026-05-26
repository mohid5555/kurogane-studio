import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MOHID_GREAT // Solo Roblox developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 78% 38%, rgba(125,249,255,0.10), transparent 45%), radial-gradient(circle at 18% 80%, rgba(245,245,245,0.05), transparent 55%), #0a0a0a",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
          color: "#f5f5f5",
          position: "relative",
        }}
      >
        {/* Ghost kanji */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 60,
            fontSize: 540,
            fontWeight: 900,
            color: "rgba(245,245,245,0.04)",
            lineHeight: 1,
          }}
        >
          操
        </div>

        {/* Slash line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: -40,
            width: 1320,
            height: 4,
            background:
              "linear-gradient(90deg, transparent, #7df9ff 50%, transparent)",
            transform: "rotate(-12deg) translateY(420px)",
            opacity: 0.6,
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "rgba(245,245,245,0.6)",
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 60,
              height: 2,
              background: "rgba(245,245,245,0.4)",
            }}
          />
          <span>EST. 2022 / INDEPENDENT</span>
        </div>

        {/* Brand */}
        <div
          style={{
            marginTop: 32,
            fontSize: 132,
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: -4,
            color: "#f5f5f5",
            display: "flex",
          }}
        >
          MOHID_GREAT
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 28,
            fontSize: 38,
            fontWeight: 500,
            color: "rgba(245,245,245,0.85)",
            lineHeight: 1.2,
            maxWidth: 940,
            display: "flex",
          }}
        >
          Solo full-stack Roblox developer — built by one, played by millions.
        </div>

        {/* Footer row */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(245,245,245,0.6)",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#7df9ff",
                boxShadow: "0 0 16px #7df9ff",
              }}
            />
            <span style={{ color: "#7df9ff" }}>COMMISSIONS OPEN</span>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            <span>SCRIPTING</span>
            <span>UI</span>
            <span>VFX</span>
            <span>BUILDING</span>
            <span>LIVE OPS</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
