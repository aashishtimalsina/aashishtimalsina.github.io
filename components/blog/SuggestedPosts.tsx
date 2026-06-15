import Link from "next/link";
import { getPosts } from "@/lib/api/blog";
import { PostCard } from "@/components/blog/PostCard";

type Props = {
  currentSlug: string;
  categorySlug?: string | null;
};

async function loadSuggestions(currentSlug: string, categorySlug?: string | null) {
  const fromCategory = categorySlug
    ? await getPosts({ category: categorySlug, per_page: 6 }).catch(() => null)
    : null;

  let suggestions =
    fromCategory?.data.filter((post) => post.slug !== currentSlug).slice(0, 3) ?? [];

  if (suggestions.length < 3) {
    const latest = await getPosts({ per_page: 8 }).catch(() => null);
    const seen = new Set([currentSlug, ...suggestions.map((post) => post.slug)]);

    for (const post of latest?.data ?? []) {
      if (seen.has(post.slug)) continue;
      suggestions.push(post);
      seen.add(post.slug);
      if (suggestions.length >= 3) break;
    }
  }

  return suggestions;
}

export async function SuggestedPosts({ currentSlug, categorySlug }: Props) {
  const suggestions = await loadSuggestions(currentSlug, categorySlug);

  if (suggestions.length === 0) return null;

  return (
    <aside className="mt-12 border-t border-border pt-10 sm:mt-14 sm:pt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Suggested reading</h2>
          <p className="mt-1 text-sm text-fg-muted">More notes you may find useful.</p>
        </div>
        <Link href="/blog" className="shrink-0 text-sm text-fg-muted transition hover:text-fg">
          View all
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {suggestions.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </aside>
  );
}
