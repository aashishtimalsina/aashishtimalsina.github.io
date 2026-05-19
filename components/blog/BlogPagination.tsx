import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { blogCategoryUrl, blogListUrl } from "@/lib/blog-url";
import { cn } from "@/utils/cn";

type BaseProps = {
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
};

type BlogListProps = BaseProps & {
  variant: "blog";
  search?: string;
  category?: string;
};

type CategoryProps = BaseProps & {
  variant: "category";
  categorySlug: string;
};

type Props = BlogListProps | CategoryProps;

function pageHref(props: Props, page: number) {
  if (props.variant === "category") {
    return blogCategoryUrl(props.categorySlug, page);
  }
  return blogListUrl({
    page,
    search: props.search,
    category: props.category,
  });
}

function visiblePages(current: number, last: number): number[] {
  if (last <= 7) {
    return Array.from({ length: last }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, last, current, current - 1, current + 1]);
  return [...pages].filter((p) => p >= 1 && p <= last).sort((a, b) => a - b);
}

export function BlogPagination(props: Props) {
  const { currentPage, lastPage, total, perPage } = props;

  if (lastPage <= 1) return null;

  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);
  const pages = visiblePages(currentPage, lastPage);

  const linkClass = (active: boolean) =>
    cn(
      "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition",
      active
        ? "border-accent-1/50 bg-accent-1/10 text-fg"
        : "border-border text-fg-muted hover:border-white/20 hover:bg-white/5 hover:text-fg",
    );

  return (
    <nav
      className="mt-14 flex flex-col items-center gap-4 border-t border-border pt-10 sm:flex-row sm:justify-between"
      aria-label="Blog pagination"
    >
      <p className="text-sm text-fg-muted">
        Showing <span className="text-fg">{from}</span>–<span className="text-fg">{to}</span> of{" "}
        <span className="text-fg">{total}</span> articles
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1">
        {currentPage > 1 ? (
          <Link
            href={pageHref(props, currentPage - 1)}
            className={cn(linkClass(false), "gap-1 px-3")}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Prev</span>
          </Link>
        ) : (
          <span
            className={cn(linkClass(false), "cursor-not-allowed opacity-40")}
            aria-disabled="true"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </span>
        )}

        <ul className="flex items-center gap-1">
          {pages.map((page, index) => {
            const prev = pages[index - 1];
            const showEllipsis = prev !== undefined && page - prev > 1;

            return (
              <li key={page} className="flex items-center gap-1">
                {showEllipsis ? (
                  <span className="px-2 text-sm text-fg-muted" aria-hidden>
                    …
                  </span>
                ) : null}
                <Link
                  href={pageHref(props, page)}
                  className={linkClass(page === currentPage)}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </Link>
              </li>
            );
          })}
        </ul>

        {currentPage < lastPage ? (
          <Link
            href={pageHref(props, currentPage + 1)}
            className={cn(linkClass(false), "gap-1 px-3")}
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : (
          <span
            className={cn(linkClass(false), "cursor-not-allowed opacity-40")}
            aria-disabled="true"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </span>
        )}
      </div>
    </nav>
  );
}
