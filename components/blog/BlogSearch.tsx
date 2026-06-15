"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/utils/cn";

const suggestions = [
  "deployment",
  "APIs",
  "payments",
  "operations",
  "scaling",
] as const;

type Props = { defaultValue?: string };

export function BlogSearch({ defaultValue = "" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultValue);

  function searchFor(term: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", term);
    params.delete("page");
    router.push(`/blog?${params.toString()}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("search", query.trim());
    } else {
      params.delete("search");
    }
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `/blog?${qs}` : "/blog");
  }

  return (
    <div className="mt-6 sm:mt-8">
      <form onSubmit={handleSubmit} role="search" className="relative">
        <label htmlFor="blog-search" className="sr-only">
          Search blog posts
        </label>
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 pl-10 text-sm text-fg placeholder:text-fg-muted focus:border-fg-muted focus:outline-none focus:ring-1 focus:ring-fg-muted"
        />
        <svg
          className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-fg-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-fg-muted">Suggestions:</span>
        {suggestions.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => {
              setQuery(term);
              searchFor(term);
            }}
            className={cn(
              "rounded-lg border border-border px-2.5 py-1 text-xs text-fg-muted transition hover:text-fg",
              defaultValue.toLowerCase() === term.toLowerCase() && "border-fg-muted text-fg",
            )}
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
