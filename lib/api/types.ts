export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[];
  posts_count?: number;
};

export type PostSeo = {
  meta_title: string;
  meta_description: string | null;
  meta_keywords: string[];
  og_title: string;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  robots: string;
  schema_type: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content?: string;
  featured_image: string | null;
  status: string;
  published_at: string | null;
  reading_time_minutes: number | null;
  category: Category | null;
  author?: { name: string };
  seo: PostSeo;
  created_at: string;
  updated_at: string;
};

export type Paginated<T> = {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type SitemapData = {
  posts: { slug: string; last_modified: string | null }[];
  categories: { slug: string; last_modified: string | null }[];
};
