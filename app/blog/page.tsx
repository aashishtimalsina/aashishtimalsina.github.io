import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AdUnit } from "@/components/ads/AdUnit";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryNav } from "@/components/blog/CategoryNav";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { getCategories, getPosts } from "@/lib/api/blog";
import { blogListingMetadata } from "@/lib/blog-seo";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = blogListingMetadata();

export const revalidate = 60;

type Props = {
  searchParams: Promise<{ search?: string; category?: string; page?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { search, category, page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const [postsRes, categories] = await Promise.all([
    getPosts({ search, category, page, per_page: 12 }).catch(() => ({
      data: [],
      meta: { current_page: 1, last_page: 1, per_page: 12, total: 0 },
    })),
    getCategories().catch(() => []),
  ]);

  const { meta } = postsRes;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} Blog`,
    url: absoluteUrl("/blog"),
    description:
      "Production software notes from real shipped systems — APIs, payments, operations, and scaling lessons.",
    author: { "@type": "Person", name: site.name, url: site.url },
    blogPost: postsRes.data.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.published_at,
    })),
  };

  return (
    <SiteLayout>
      <main>
        <JsonLd
          data={[
            blogSchema,
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ]),
          ]}
        />
        <Section className="pt-10">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Production software notes
              </h1>
              <p className="mt-3 text-base leading-relaxed text-fg-muted sm:mt-4 sm:text-lg">
                Notes from building and deploying real systems — APIs, payments, operations, and the
                mistakes you only find in production.
              </p>
            </div>

            <Suspense fallback={<div className="mt-8 h-12 max-w-xl animate-pulse rounded-xl bg-card/60" />}>
              <BlogSearch defaultValue={search} />
            </Suspense>

            <div className="mt-10">
              <CategoryNav categories={categories} activeSlug={category} />
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {postsRes.data.length === 0 ? (
                <p className="col-span-full text-fg-muted">
                  {search ? `No posts found for "${search}".` : "No posts published yet."}
                </p>
              ) : (
                postsRes.data.map((post) => <PostCard key={post.id} post={post} />)
              )}
            </div>

            <AdUnit />

            <BlogPagination
              variant="blog"
              currentPage={meta.current_page}
              lastPage={meta.last_page}
              total={meta.total}
              perPage={meta.per_page}
              search={search}
              category={category}
            />
          </Container>
        </Section>
      </main>
    </SiteLayout>
  );
}
