import { apiFetch } from "./client";

export type Comment = {
  id: number;
  body: string;
  status: string;
  parent_id: number | null;
  created_at: string;
  user?: { id: number; name: string; avatar: string | null };
  replies?: Comment[];
};

export async function getPostComments(slug: string) {
  const json = await apiFetch<{
    data: Comment[];
    meta: { ratings_count: number; ratings_average: number | null };
  }>(`/posts/${slug}/comments`, { auth: false });
  return json;
}

export async function postComment(slug: string, body: string, parentId?: number) {
  return apiFetch<{ message: string; data: Comment }>(`/posts/${slug}/comments`, {
    method: "POST",
    body: JSON.stringify({ body, parent_id: parentId }),
  });
}

export async function ratePost(slug: string, rating: number, review?: string) {
  return apiFetch<{
    message: string;
    data: { rating: number; review: string | null; average: number };
  }>(`/posts/${slug}/rate`, {
    method: "POST",
    body: JSON.stringify({ rating, review }),
  });
}
