/** Build `/blog` listing URLs while preserving filters. */
export function blogListUrl(params?: {
  page?: number;
  search?: string;
  category?: string;
}) {
  const q = new URLSearchParams();
  if (params?.search?.trim()) q.set("search", params.search.trim());
  if (params?.category?.trim()) q.set("category", params.category.trim());
  if (params?.page && params.page > 1) q.set("page", String(params.page));

  const query = q.toString();
  return query ? `/blog?${query}` : "/blog";
}

/** Build `/blog/category/{slug}` URLs with optional page. */
export function blogCategoryUrl(slug: string, page?: number) {
  if (page && page > 1) return `/blog/category/${slug}?page=${page}`;
  return `/blog/category/${slug}`;
}
