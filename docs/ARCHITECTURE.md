# Architecture — Laravel + Next.js Product Stack

This portfolio is a reference implementation of a **modern Laravel + Next.js** product: API-driven content, server-rendered SEO, and edge-friendly delivery.

## Stack overview

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│ Filament /admin │────▶│ Laravel API      │────▶│ Next.js (frontend)  │
│ Posts, SEO, img │     │ /api/v1          │     │ SSR + ISR + metadata│
└─────────────────┘     └──────────────────┘     └─────────────────────┘
         │                        │                          │
         │                        ▼                          ▼
         │                 storage/app/public          Cloudflare CDN
         │                 (featured images)           (cache + SSL)
         └──────────────────────────────────────────────────────────▶ Google
```

| Layer | Technology | Role |
|-------|------------|------|
| **Backend** | Laravel 13, Sanctum, Filament v4 | CMS, public API, auth for admin |
| **Frontend** | Next.js 15 App Router | Portfolio + blog UI, server components |
| **Blog** | Headless CMS (this repo) | Rich HTML from Filament; optional **MDX** for static/hybrid sites |
| **CDN** | Cloudflare | Cache static assets & pages at the edge |
| **Images** | `next/image` + AVIF/WebP | Automatic format negotiation and lazy loading |
| **SEO** | `generateMetadata`, JSON-LD | Titles, OG, Twitter, sitemap, RSS — all server-rendered |

## Blog: headless vs MDX

**This site (production):**

1. Editor writes in **Filament** (rich text, SEO tab, featured image).
2. Laravel exposes `GET /api/v1/posts` and `/posts/{slug}`.
3. Next.js fetches on the server (`revalidate: 120`), renders HTML, and injects **BlogPosting** schema.

**MDX (when you need it):**

- Marketing pages, changelogs, or docs co-located in the Next.js repo.
- Hybrid: MDX for landing pages + Laravel API for dynamic blog posts.
- Full MDX blog: replace API content with `.mdx` files — trade-off is no Filament UI for non-devs.

Tutorials in the **Laravel + SaaS** niche can cover both patterns; this repo proves the **headless CMS** path clients actually use.

## Server-side SEO

Implemented in `frontend/lib/seo/` and per-route `generateMetadata`:

- **Listing:** `/blog` — metadata + `CollectionPage`-style intro
- **Post:** `/blog/[slug]` — title, description, canonical, OG image from API
- **Global:** `/sitemap.xml`, `/robots.txt`, `/feed.xml`, Person/WebSite JSON-LD
- **Revalidation:** ISR (`revalidate = 120`) so new posts appear without full rebuilds

Google sees fully rendered HTML on first request — not client-only meta tags.

## Image optimization

- `OptimizedImage` wraps `next/image` with consistent `sizes` and priority for LCP.
- `next.config.ts`: AVIF/WebP, `remotePatterns` for Laravel `/storage/**` URLs.
- Production: serve uploads from API domain or **Cloudflare R2** + public URL in `remotePatterns`.

## Cloudflare CDN (recommended production)

1. **DNS** — Point apex/`www` to Vercel (or your host); orange-cloud proxy enabled.
2. **Cache rules**
   - Cache static: `/_next/static/*`, fonts, images (long TTL).
   - Bypass cache: `/api/*` on Laravel origin (if proxied).
3. **Next.js on Vercel** — Vercel edge + Cloudflare in front is common; avoid double-caching HTML unless you understand `Cache-Control`.
4. **R2 (optional)** — Laravel `FILESYSTEM_DISK=s3` compatible driver for featured images; add R2 hostname to `remotePatterns`.
5. **SSL** — Full (strict) between Cloudflare and origin.

See `SEO_SETUP.md` for Search Console and Analytics after deploy.

## Local development

```bash
# Terminal 1 — API + admin
cd backend && php artisan serve
# Admin: http://localhost:8000/admin

# Terminal 2 — Next.js
cd frontend && npm run dev
# Set NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## Content & authority

This architecture is itself a **monetizable skill**: clients want Laravel APIs, Next frontends, SEO blogs, and fast global delivery. Document builds on the blog using the 70/20/10 mix in `CONTENT_STRATEGY.md`.

### Tutorial ideas from this stack

- Laravel API + Next.js App Router integration
- Filament as a SaaS admin panel
- Server-side SEO with `generateMetadata` and JSON-LD
- Next.js image optimization with a Laravel media API
- Deploying Laravel + Next.js behind Cloudflare
