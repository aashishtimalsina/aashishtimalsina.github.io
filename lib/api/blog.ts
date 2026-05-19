import type { Category, Paginated, Post, SitemapData } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://admin.aashishtimalsina.com.np/api/v1";

async function fetchApi<T>(path: string, revalidate = 60): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate },
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${path}`);
  }

  return res.json() as Promise<T>;
}

export async function getPosts(params?: {
  category?: string;
  search?: string;
  page?: number;
  per_page?: number;
}): Promise<Paginated<Post>> {
  const q = new URLSearchParams();
  if (params?.category) q.set("category", params.category);
  if (params?.search) q.set("search", params.search);
  if (params?.page) q.set("page", String(params.page));
  if (params?.per_page) q.set("per_page", String(params.per_page));
  const query = q.toString();

  return fetchApi<Paginated<Post>>(`/posts${query ? `?${query}` : ""}`);
}

export async function getAllPosts(): Promise<Post[]> {
  const first = await getPosts({ page: 1, per_page: 50 });
  const posts = [...first.data];

  for (let page = 2; page <= first.meta.last_page; page++) {
    const res = await getPosts({ page, per_page: 50 });
    posts.push(...res.data);
  }

  return posts;
}

export async function getPost(slug: string): Promise<Post> {
  const json = await fetchApi<{ data: Post }>(`/posts/${slug}`, 120);
  return json.data;
}

export async function getCategories(): Promise<Category[]> {
  const json = await fetchApi<{ data: Category[] }>("/categories");
  return json.data;
}

export async function getCategoryPosts(
  slug: string,
  page = 1,
  perPage = 12
): Promise<{ posts: Paginated<Post>; category: Category }> {
  const json = await fetchApi<Paginated<Post> & { category: Category }>(
    `/categories/${slug}/posts?page=${page}&per_page=${perPage}`,
  );
  return {
    posts: { data: json.data, meta: json.meta, links: json.links },
    category: json.category,
  };
}

export async function getSitemapData(): Promise<SitemapData> {
  return fetchApi<SitemapData>("/sitemap", 300);
}
