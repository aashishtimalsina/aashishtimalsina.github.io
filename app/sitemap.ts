import type { MetadataRoute } from "next";
import { getSitemapData } from "@/lib/api/blog";
import { staticRoutes } from "@/lib/navigation";
import { site, absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

const priorities: Record<string, number> = {
  "/": 1,
  "/about": 0.9,
  "/services": 0.9,
  "/blog": 0.95,
  "/contact": 0.8,
  "/privacy-policy": 0.3,
  "/terms": 0.3,
  "/disclaimer": 0.3,
};

const changeFrequency: Record<
  string,
  MetadataRoute.Sitemap[number]["changeFrequency"]
> = {
  "/": "weekly",
  "/blog": "daily",
  "/about": "monthly",
  "/services": "monthly",
  "/contact": "monthly",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: changeFrequency[path] ?? "monthly",
    priority: priorities[path] ?? 0.5,
  }));

  try {
    const data = await getSitemapData();
    const postRoutes: MetadataRoute.Sitemap = data.posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.last_modified ? new Date(p.last_modified) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
    const categoryRoutes: MetadataRoute.Sitemap = data.categories.map((c) => ({
      url: absoluteUrl(`/blog/category/${c.slug}`),
      lastModified: c.last_modified ? new Date(c.last_modified) : now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
    return [...staticPages, ...postRoutes, ...categoryRoutes];
  } catch {
    return staticPages;
  }
}
