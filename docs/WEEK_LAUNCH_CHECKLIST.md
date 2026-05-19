# This Week — Launch Checklist

Track progress for the portfolio go-live week.

## 1. Privacy Policy + Contact page

| Task | Status |
|------|--------|
| Privacy Policy at `/privacy-policy` (analytics + contact form disclosures) | Done in repo |
| Contact page at `/contact` with inquiry form | Done in repo |
| Footer links to legal pages | Done |

**You:** Review copy and update `frontend/lib/site.ts` if email/phone change.

## 2. Publish 10 high-quality Laravel blogs

Flagship posts (expanded content on seed):

1. `10-laravel-packages-i-use-in-production`
2. `multi-tenant-laravel-guide`
3. `laravel-api-authentication-sanctum-jwt`
4. `laravel-saas-tutorial-step-by-step`
5. `esewa-integration-laravel`
6. `deploy-laravel-digitalocean-nginx-docker`
7. `laravel-filament-admin-panel-tutorial`
8. `building-seo-friendly-apis-with-laravel`
9. `laravel-queue-jobs-complete-guide`
10. `how-i-built-multi-tenant-hrm-laravel`

```bash
cd backend
php artisan migrate
php artisan db:seed --class=BlogSeeder
```

**You:** Open Filament `/admin` → verify all 10 are **Published**. Add featured images for better OG shares.

## 3. Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://aashishtimalsina.com.np`
3. Copy HTML tag verification code
4. Set in `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-code-here
   ```
5. Redeploy frontend → click **Verify** in GSC
6. **Sitemaps** → submit: `https://aashishtimalsina.com.np/sitemap.xml`
7. URL Inspection → request indexing for `/`, `/blog`, top 3 posts

## 4. Google Analytics 4

1. [Google Analytics](https://analytics.google.com) → Create property → Web stream
2. Copy Measurement ID (`G-XXXXXXXXXX`)
3. Set in `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
4. Redeploy → check **Realtime** report while browsing the site

## 5. Sitemap

| Item | URL |
|------|-----|
| XML sitemap | `/sitemap.xml` |
| Robots | `/robots.txt` |
| RSS | `/feed.xml` |

Already generated from Laravel API + static routes. After deploy, confirm:

```bash
curl -s https://aashishtimalsina.com.np/sitemap.xml | head -40
```

## 6. Improve page speed

**Done in repo:**

- Next.js Image AVIF/WebP + long cache TTL
- `compress: true` + static asset cache headers
- Google Analytics `lazyOnload` (non-blocking)
- Dynamic import for `ProjectsSection` (smaller initial JS)
- Removed Framer Motion from project cards (CSS hover)

**You after deploy:**

- Run [PageSpeed Insights](https://pagespeed.web.dev/) on home + one blog post
- Enable Cloudflare CDN (see `ARCHITECTURE.md`)
- Add featured images via Filament (improves LCP on blog cards)
- Target: Lighthouse Performance 85+, SEO 95+

## Production env reminder

```env
# frontend/.env.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxx

# backend/.env
APP_URL=https://api.yourdomain.com
CORS_ALLOWED_ORIGINS=https://aashishtimalsina.com.np
```

## Week complete when

- [ ] Contact form submits successfully (check `contact_messages` table)
- [ ] 10 flagship posts live with images
- [ ] GSC verified + sitemap submitted
- [ ] GA4 realtime shows your visit
- [ ] PageSpeed run documented (screenshot or scores in notes)
