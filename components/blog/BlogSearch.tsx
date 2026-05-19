"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = { defaultValue?: string };

export function BlogSearch({ defaultValue = "" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultValue);

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
        className="w-full rounded-xl border border-border bg-bg/40 px-4 py-3 pl-11 text-sm text-fg placeholder:text-fg-muted focus:border-accent-1/50 focus:outline-none focus:ring-2 focus:ring-accent-1/20"
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
  );
}
