import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { OptimizedImage } from "@/components/seo/OptimizedImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPost } from "@/lib/api/blog";
import { CommentsSection } from "@/components/blog/CommentsSection";
import { postBreadcrumbJsonLd, postJsonLd, postMetadata } from "@/lib/blog-seo";

export const revalidate = 120;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  try {
    const { slug } = await params;
    const post = await getPost(slug);
    return postMetadata(post);
  } catch {
    return { title: "Post not found", robots: { index: false } };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getPost(slug);
  } catch {
    notFound();
  }

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <SiteLayout>
      <main>
        <JsonLd data={[postJsonLd(post), postBreadcrumbJsonLd(post)]} />
        <Section className="pt-10">
          <Container>
            <article className="mx-auto max-w-3xl" itemScope itemType="https://schema.org/BlogPosting">
              <header className="border-b border-border pb-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-accent-1 transition hover:text-fg"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Back to blog
                </Link>

                <h1
                  className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
                  itemProp="headline"
                >
                  {post.title}
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-fg-muted">
                  {post.category ? (
                    <Link
                      href={`/blog/category/${post.category.slug}`}
                      className="rounded-full border border-accent-2/40 bg-accent-2/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-2 transition hover:border-accent-2/60 hover:bg-accent-2/15"
                    >
                      {post.category.name}
                    </Link>
                  ) : null}
                  {date ? (
                    <time dateTime={post.published_at ?? undefined} itemProp="datePublished">
                      {date}
                    </time>
                  ) : null}
                  {date && post.reading_time_minutes ? (
                    <span className="text-fg-muted/60" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  {post.reading_time_minutes ? (
                    <span>{post.reading_time_minutes} min read</span>
                  ) : null}
                </div>
              </header>

              {post.featured_image ? (
                <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
                  <OptimizedImage
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              ) : null}

              {post.content ? (
                <div
                  className="prose prose-invert prose-lg mt-10 max-w-none rounded-2xl border border-border bg-card/30 p-6 sm:p-8 prose-headings:tracking-tight prose-headings:text-fg prose-p:text-fg-muted prose-a:text-accent-1 prose-strong:text-fg prose-code:rounded prose-code:bg-bg/50 prose-code:px-1 prose-code:py-0.5 prose-code:text-fg prose-pre:border prose-pre:border-border prose-pre:bg-bg/40"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  itemProp="articleBody"
                />
              ) : null}

              <CommentsSection slug={slug} />
            </article>
          </Container>
        </Section>
      </main>
    </SiteLayout>
  );
}
