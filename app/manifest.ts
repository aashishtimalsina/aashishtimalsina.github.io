import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Aashish T.",
    description:
      "Software engineer portfolio — production systems, deployments, and scalable applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1628",
    theme_color: "#6366f1",
    lang: "en",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
