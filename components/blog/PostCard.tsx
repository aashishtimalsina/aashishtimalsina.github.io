import Link from "next/link";
import { OptimizedImage } from "@/components/seo/OptimizedImage";
import type { Post } from "@/lib/api/types";
import { cn } from "@/utils/cn";

type Props = {
  post: Post;
  className?: string;
};

export function PostCard({ post, className }: Props) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article
      className={cn(
        "group rounded-2xl border border-border bg-card/40 p-6 transition hover:border-white/20 hover:shadow-glow",
        className,
      )}
    >
      {post.featured_image ? (
        <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl border border-border">
          <OptimizedImage
            src={post.featured_image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
        {post.category ? (
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="font-medium uppercase tracking-wider text-accent-2 hover:underline"
          >
            {post.category.name}
          </Link>
        ) : null}
        {date ? <time dateTime={post.published_at ?? undefined}>{date}</time> : null}
        {post.reading_time_minutes ? <span>{post.reading_time_minutes} min read</span> : null}
      </div>

      <h2 className="mt-3 text-xl font-semibold tracking-tight">
        <Link href={`/blog/${post.slug}`} className="hover:text-accent-1">
          {post.title}
        </Link>
      </h2>

      {post.excerpt ? (
        <p className="mt-2 line-clamp-3 text-sm text-fg-muted">{post.excerpt}</p>
      ) : null}

      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-block text-sm text-accent-1 hover:underline"
      >
        Read article →
      </Link>
    </article>
  );
}
