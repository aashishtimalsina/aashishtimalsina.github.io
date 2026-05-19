/** Production stack this site demonstrates and you ship for clients. */
export const productStack = [
  {
    id: "laravel",
    label: "Laravel backend",
    short: "Laravel",
    description:
      "REST API, Filament admin, Sanctum auth, multi-tenant SaaS, queues, and payment integrations.",
  },
  {
    id: "nextjs",
    label: "Next.js frontend",
    short: "Next.js",
    description:
      "App Router, React Server Components, TypeScript, and ISR for fast, SEO-friendly pages.",
  },
  {
    id: "blog",
    label: "Headless blog",
    short: "Blog CMS",
    description:
      "Filament CMS → Laravel API → Next.js pages. MDX optional for static docs or hybrid content.",
  },
  {
    id: "cdn",
    label: "Cloudflare CDN",
    short: "Cloudflare",
    description:
      "Edge caching, DNS, SSL, and optional R2 for media — global performance without complex ops.",
  },
  {
    id: "images",
    label: "Image optimization",
    short: "Images",
    description:
      "Next.js Image (AVIF/WebP), responsive sizes, and remote patterns for API-hosted uploads.",
  },
  {
    id: "seo",
    label: "Server-side SEO",
    short: "SSR SEO",
    description:
      "generateMetadata, JSON-LD, sitemap.xml, RSS, canonical URLs, and OG images rendered on the server.",
  },
] as const;

export const stackSummary =
  "Laravel backend · Next.js frontend · headless blog · Cloudflare CDN · optimized images · server-side SEO";
