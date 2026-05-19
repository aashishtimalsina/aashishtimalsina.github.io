import { absoluteUrl } from "@/lib/site";
import { defaultSite, type SiteConfig } from "@/lib/site-defaults";
import { seo } from "@/lib/seo";
import type { Post } from "@/lib/api/types";

export function personSchema(site: SiteConfig = defaultSite) {
  const sameAs = [site.github, site.linkedin, site.twitter].filter(Boolean) as string[];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: site.avatar ?? undefined,
    sameAs,
    knowsAbout: [
      "Laravel",
      "Next.js",
      "SaaS Development",
      "Headless CMS",
      "Server-Side SEO",
      "Cloudflare CDN",
      "Filament",
      "Multi-Tenant Architecture",
    ],
  };
}

export function websiteSchema(site: SiteConfig = defaultSite) {
  const title = site.seo?.title ?? seo.title;
  const description = site.seo?.description ?? seo.description;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: title,
    url: site.url,
    description,
    inLanguage: "en",
    publisher: { "@id": `${site.url}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/blog", site.url)}?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema(site: SiteConfig = defaultSite) {
  const description = site.seo?.description ?? seo.description;
  const sameAs = [site.github, site.linkedin, site.twitter].filter(Boolean) as string[];

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    description,
    areaServed: { "@type": "Country", name: "Nepal" },
    founder: { "@id": `${site.url}/#person` },
    sameAs,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[], baseUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path, baseUrl),
    })),
  };
}

export function blogPostSchema(post: Post, site: SiteConfig = defaultSite) {
  const url = post.seo.canonical_url || absoluteUrl(`/blog/${post.slug}`, site.url);
  const image = post.seo.og_image || post.featured_image;

  return {
    "@context": "https://schema.org",
    "@type": post.seo.schema_type || "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.seo.meta_description || post.excerpt,
    image: image ? [image] : [absoluteUrl("/og/default", site.url)],
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.author?.name ?? site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.seo.meta_keywords?.join(", "),
    articleSection: post.category?.name,
    inLanguage: "en",
    isPartOf: { "@id": `${site.url}/#website` },
  };
}

export function rootGraphSchema(site: SiteConfig = defaultSite) {
  return {
    "@context": "https://schema.org",
    "@graph": [personSchema(site), websiteSchema(site), organizationSchema(site)],
  };
}
