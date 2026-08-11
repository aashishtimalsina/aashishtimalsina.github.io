import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AdUnit } from "@/components/ads/AdUnit";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryNav } from "@/components/blog/CategoryNav";
import { getCategories, getCategoryPosts } from "@/lib/api/blog";
import { categoryBreadcrumbJsonLd, categoryMetadata } from "@/lib/blog-seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props) {
  try {
    const { slug } = await params;
    const { category } = await getCategoryPosts(slug);
    return categoryMetadata(category);
  } catch {
    return { title: "Category not found" };
  }
}

export default async function BlogCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  let categoryPosts;
  let categories;
  try {
    [categoryPosts, categories] = await Promise.all([
      getCategoryPosts(slug, page),
      getCategories(),
    ]);
  } catch {
    notFound();
  }

  const { category, posts } = categoryPosts;

  return (
    <SiteLayout>
    <main>
      <JsonLd data={categoryBreadcrumbJsonLd(category)} />
      <Section className="pt-10">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{category.name}</h1>
            {category.description ? (
              <p className="mt-4 text-lg text-fg-muted">{category.description}</p>
            ) : null}
          </div>

          <div className="mt-10">
            <CategoryNav categories={categories} activeSlug={slug} />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.data.length === 0 ? (
              <p className="col-span-full text-fg-muted">No posts in this category yet.</p>
            ) : (
              posts.data.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>

          <AdUnit />

          <BlogPagination
            variant="category"
            categorySlug={slug}
            currentPage={posts.meta.current_page}
            lastPage={posts.meta.last_page}
            total={posts.meta.total}
            perPage={posts.meta.per_page}
          />
        </Container>
      </Section>
    </main>
    </SiteLayout>
  );
}
