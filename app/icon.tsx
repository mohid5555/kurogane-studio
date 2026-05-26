import { ImageResponse } from "next/og";
import { studio } from "@/lib/data";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Cache the icon for a day; Roblox CDN URLs rotate periodically.
export const revalidate = 86400;

export default async function Icon() {
  let headshot: string | null = null;
  try {
    const r = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${studio.roblox.userId}&size=150x150&format=Png&isCircular=false`,
      { next: { revalidate: 86400 } },
    );
    const j = await r.json();
    headshot = j?.data?.[0]?.imageUrl ?? null;
  } catch {
    headshot = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          position: "relative",
        }}
      >
        {headshot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={headshot}
            alt="MG"
            width={64}
            height={64}
            style={{ width: 64, height: 64, objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 900,
              color: "#7df9ff",
              letterSpacing: -2,
            }}
          >
            MG
          </div>
        )}
        {/* ice accent corner dot */}
        <div
          style={{
            position: "absolute",
            right: 4,
            bottom: 4,
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "#7df9ff",
            boxShadow: "0 0 6px #7df9ff",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
