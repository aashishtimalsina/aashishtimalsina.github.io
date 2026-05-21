import type { NextConfig } from "next";

/** Hostnames that serve Laravel public/storage assets (blog images, portfolio uploads). */
const STORAGE_IMAGE_HOSTS = [
  { protocol: "http" as const, hostname: "localhost", port: "8000" },
  { protocol: "http" as const, hostname: "127.0.0.1", port: "8000" },
  { protocol: "https" as const, hostname: "admin.aashishtimalsina.com.np" },
  { protocol: "https" as const, hostname: "aashishtimalsina.com.np" },
  { protocol: "https" as const, hostname: "www.aashishtimalsina.com.np" },
];

function storageRemotePatterns(): NonNullable<NextConfig["images"]>["remotePatterns"] {
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = STORAGE_IMAGE_HOSTS.map(
    ({ protocol, hostname, port }) => ({
      protocol,
      hostname,
      ...(port ? { port } : {}),
      pathname: "/**",
    }),
  );

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    try {
      const { hostname, port, protocol } = new URL(apiUrl);
      if (hostname && !patterns.some((p) => p?.hostname === hostname)) {
        patterns.push({
          protocol: (protocol.replace(":", "") || "https") as "http" | "https",
          hostname,
          ...(port ? { port } : {}),
          pathname: "/**",
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
    // Used when next/image loads remote URLs (e.g. production). Blog cards use <img> for API URLs.
    remotePatterns: storageRemotePatterns(),
    domains: STORAGE_IMAGE_HOSTS.map((h) => h.hostname),
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
