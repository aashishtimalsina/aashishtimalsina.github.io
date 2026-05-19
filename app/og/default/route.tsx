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
        <div style={{ fontSize: 28, opacity: 0.8 }}>{site.role}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 700 }}>{site.name}</div>
          <div style={{ fontSize: 26, opacity: 0.85, maxWidth: 900 }}>{seo.description}</div>
        </div>
        <div style={{ fontSize: 22, opacity: 0.7 }}>{site.url}</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
