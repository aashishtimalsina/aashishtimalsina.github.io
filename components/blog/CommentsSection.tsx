"use client";

import { useEffect, useState } from "react";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { useAuth } from "@/components/providers/AuthProvider";
import { Card, CardBody } from "@/components/ui/Card";
import {
  getPostComments,
  postComment,
  ratePost,
  type Comment,
} from "@/lib/api/comments";
import { cn } from "@/utils/cn";

export function CommentsSection({ slug }: { slug: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [avg, setAvg] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function load() {
    getPostComments(slug).then((res) => {
      setComments(res.data);
      setAvg(res.meta.ratings_average);
      setCount(res.meta.ratings_count);
    });
  }

  useEffect(() => {
    load();
  }, [slug]);

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await postComment(slug, body);
      setMessage(res.message);
      setBody("");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  async function submitRating(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const res = await ratePost(slug, rating, review || undefined);
      setMessage(res.message);
      setAvg(res.data.average);
      load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-12 space-y-8 border-t border-border pt-10">
      <h2 className="text-xl font-semibold text-fg">Comments & reviews</h2>

      {avg !== null && count > 0 ? (
        <p className="text-sm text-fg-muted">
          {avg} / 5 · {count} rating{count === 1 ? "" : "s"}
        </p>
      ) : null}

      <ul className="space-y-4">
        {comments.map((c) => (
          <li key={c.id}>
            <Card>
              <CardBody className="space-y-2">
                <p className="text-xs text-fg-muted">
                  {c.user?.name ?? "Member"} · {new Date(c.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-fg">{c.body}</p>
                {c.replies?.length ? (
                  <ul className="mt-3 space-y-2 border-l border-border pl-4">
                    {c.replies.map((r) => (
                      <li key={r.id} className="text-sm text-fg-muted">
                        <strong className="text-fg">{r.user?.name}</strong>: {r.body}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </CardBody>
            </Card>
          </li>
        ))}
        {comments.length === 0 ? (
          <p className="text-sm text-fg-muted">No comments yet. Be the first.</p>
        ) : null}
      </ul>

      {user ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardBody>
              <form onSubmit={submitComment} className="space-y-3">
                <h3 className="text-sm font-semibold text-fg">Leave a comment</h3>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={4}
                  required
                  minLength={3}
                  className={inputClass}
                  placeholder="Share your thoughts…"
                />
                <button type="submit" disabled={loading} className={btnClass}>
                  Post comment
                </button>
              </form>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <form onSubmit={submitRating} className="space-y-3">
                <h3 className="text-sm font-semibold text-fg">Rate this article</h3>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className={inputClass}
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} stars
                    </option>
                  ))}
                </select>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={3}
                  className={inputClass}
                  placeholder="Optional review…"
                />
                <button type="submit" disabled={loading} className={btnClass}>
                  Submit rating
                </button>
              </form>
            </CardBody>
          </Card>
        </div>
      ) : (
        <Card>
          <CardBody className="flex flex-col items-start gap-3">
            <p className="text-sm text-fg-muted">Sign in to comment or rate.</p>
            <GoogleSignInButton redirect={`/blog/${slug}`} />
          </CardBody>
        </Card>
      )}

      {message ? <p className="text-sm text-accent-1">{message}</p> : null}
    </div>
  );
}

const inputClass = cn(
  "w-full rounded-xl border border-border bg-bg/40 p-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-2))]",
);
const btnClass = cn(
  "rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-fg hover:bg-white/15 disabled:opacity-50",
);
