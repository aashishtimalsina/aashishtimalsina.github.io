import type { NextConfig } from "next";

function apiImagePatterns() {
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
    {
      protocol: "http",
      hostname: "localhost",
      port: "8000",
      pathname: "/storage/**",
    },
    {
      protocol: "https",
      hostname: "aashishtimalsina.com.np",
      pathname: "/storage/**",
    },
    {
      protocol: "https",
      hostname: "www.aashishtimalsina.com.np",
      pathname: "/storage/**",
    },
    {
      protocol: "https",
      hostname: "admin.aashishtimalsina.com.np",
      pathname: "/storage/**",
    },
  ];

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    try {
      const { hostname, port, protocol } = new URL(apiUrl);
      if (hostname && hostname !== "localhost" && !patterns.some((p) => p?.hostname === hostname)) {
        patterns.push({
          protocol: (protocol.replace(":", "") || "https") as "http" | "https",
          hostname,
          ...(port ? { port } : {}),
          pathname: "/storage/**",
        });
      }
    } catch {
      // ignore invalid URL
    }
  }

  return patterns;
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*\\.(svg|png|jpg|jpeg|webp|avif|ico|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: apiImagePatterns(),
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
