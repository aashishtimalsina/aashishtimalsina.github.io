import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, blogPostSchema } from "@/lib/seo/schema";
import { absoluteUrl, site } from "@/lib/site";
import type { Category, Post } from "@/lib/api/types";

export function postMetadata(post: Post): Metadata {
  const title = post.seo.meta_title || post.title;
  const description = post.seo.meta_description || post.excerpt || site.summary;
  const ogImage = post.seo.og_image || post.featured_image || undefined;
  const noIndex = post.seo.robots.includes("noindex");

  return buildMetadata({
    title,
    description,
    path: `/blog/${post.slug}`,
    keywords: post.seo.meta_keywords,
    ogImage,
    ogType: "article",
    publishedTime: post.published_at ?? undefined,
    modifiedTime: post.updated_at,
    noIndex,
  });
}

export function categoryMetadata(category: Category): Metadata {
  const title = category.meta_title || `${category.name} | Blog`;
  const description =
    category.meta_description || category.description || `Articles about ${category.name}`;

  return buildMetadata({
    title,
    description,
    path: `/blog/category/${category.slug}`,
    keywords: category.meta_keywords,
  });
}

export function blogListingMetadata(): Metadata {
  return buildMetadata({
    title: "Laravel & SaaS Tutorials",
    description:
      "Production Laravel and SaaS tutorials from Aashish Timalsina — multi-tenancy, APIs, Filament, eSewa, Khalti, deployment. Written by a developer who ships real systems.",
    path: "/blog",
    keywords: [
      "Laravel tutorial",
      "Laravel SaaS",
      "multi tenant Laravel",
      "Laravel API tutorial",
      "Laravel developer blog",
    ],
  });
}

export function postJsonLd(post: Post) {
  return blogPostSchema(post);
}

export function postBreadcrumbJsonLd(post: Post) {
  const items = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }];

  if (post.category) {
    items.push({
      name: post.category.name,
      path: `/blog/category/${post.category.slug}`,
    });
  }

  items.push({ name: post.title, path: `/blog/${post.slug}` });

  return breadcrumbSchema(items);
}

export function categoryBreadcrumbJsonLd(category: Category) {
  return breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: category.name, path: `/blog/category/${category.slug}` },
  ]);
}
