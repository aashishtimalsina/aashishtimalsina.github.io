import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { seo } from "@/lib/seo";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #020617 0%, #04110c 50%, #020617 100%)",
          color: "white",
          fontFamily: "ui-sans-serif, system-ui",
        }}
      >
        <div style={{ display: "flex", gap: 12, opacity: 0.9, fontSize: 22 }}>
          <span style={{ color: "#22c55e" }}>●</span>
          <span style={{ color: "#eab308" }}>●</span>
          <span style={{ color: "#ef4444" }}>●</span>
          <span style={{ marginLeft: 10, color: "rgba(255,255,255,0.75)" }}>aashish@portfolio</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -1.2 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.85)" }}>
            Software Engineer • Systems • Deployment
          </div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.70)", maxWidth: 980 }}>
            {seo.description}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.70)" }}>{site.url}</div>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.70)" }}>github.com/aashishtimalsina</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

