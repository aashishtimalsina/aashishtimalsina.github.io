import Link from "next/link";
import type { Category } from "@/lib/api/types";
import { cn } from "@/utils/cn";

type Props = {
  categories: Category[];
  activeSlug?: string;
};

export function CategoryNav({ categories, activeSlug }: Props) {
  return (
    <nav
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 scrollbar-thin sm:flex-wrap sm:overflow-visible"
      aria-label="Blog categories"
    >
      <Link
        href="/blog"
        className={cn(
          "shrink-0 rounded-full border px-4 py-1.5 text-sm transition",
          !activeSlug
            ? "border-accent-1/50 bg-accent-1/10 text-fg"
            : "border-border text-fg-muted hover:border-white/20 hover:text-fg",
        )}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/blog/category/${cat.slug}`}
          className={cn(
            "shrink-0 rounded-full border px-4 py-1.5 text-sm transition",
            activeSlug === cat.slug
              ? "border-accent-1/50 bg-accent-1/10 text-fg"
              : "border-border text-fg-muted hover:border-white/20 hover:text-fg",
          )}
        >
          {cat.name}
          {cat.posts_count != null ? ` (${cat.posts_count})` : ""}
        </Link>
      ))}
    </nav>
  );
}
