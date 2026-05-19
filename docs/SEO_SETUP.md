# SEO Setup Guide

This portfolio includes production-ready SEO. After deploying, complete these steps.

## What is already configured

| Feature | URL / location |
|---------|----------------|
| Sitemap | `/sitemap.xml` (static pages + all blog posts) |
| Robots | `/robots.txt` |
| RSS feed | `/feed.xml` |
| Meta tags | Every page via `buildMetadata()` |
| Open Graph | Dynamic images at `/og` + per-post images |
| Schema.org | Person, WebSite, ProfessionalService, BlogPosting, Breadcrumbs |
| Image optimization | Next.js Image (AVIF/WebP) via `OptimizedImage` |
| Google Analytics | Loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set |

## 1. Environment variables

Copy and fill in `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123...
```

Update `frontend/lib/site.ts` → `site.url` to your production domain.

## 2. Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add property** → enter `https://aashishtimalsina.com.np`
3. Verify ownership:
   - **Recommended:** HTML tag → copy the `content` value into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   - Redeploy frontend, then click **Verify**
4. Submit sitemap: **Sitemaps** → add `https://aashishtimalsina.com.np/sitemap.xml`
5. Request indexing for key URLs: Home, `/blog`, top blog posts

## 3. Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com)
2. Create account → **Web** stream for your domain
3. Copy **Measurement ID** (`G-XXXXXXXX`) into `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Redeploy — traffic appears within 24–48 hours

Optional: Link Analytics to Search Console (Admin → Product links).

## 4. Post-deploy checks

- [ ] `https://yoursite.com/robots.txt` shows sitemap URL
- [ ] `https://yoursite.com/sitemap.xml` lists all pages and blog posts
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) passes for a blog post URL
- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) shows OG image
- [ ] Lighthouse SEO score 90+

## 5. Cloudflare CDN (optional, recommended)

1. Add your domain to Cloudflare and point DNS to your host (e.g. Vercel for Next.js).
2. Enable **Proxied** (orange cloud) for `www` and apex.
3. Cache static assets aggressively (`/_next/static/*`, fonts, images).
4. Do not cache Laravel `/api/*` responses unless you add explicit cache rules and understand invalidation.
5. Optional: store Filament uploads on **R2** and add the public hostname to `next.config.ts` → `images.remotePatterns`.

Details: `ARCHITECTURE.md`.

## 6. Ongoing SEO

- Publish 1–2 blog posts per week via Filament (`/admin`)
- Use target keywords in title, meta description, and first paragraph
- Add internal links between related posts
- Monitor Search Console → Performance for queries and CTR
