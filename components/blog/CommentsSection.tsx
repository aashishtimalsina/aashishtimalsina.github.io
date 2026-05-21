"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, MessageSquare, Send, Star } from "lucide-react";
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
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageTone, setMessageTone] = useState<"success" | "error">("success");
  const [loadingComment, setLoadingComment] = useState(false);
  const [loadingRating, setLoadingRating] = useState(false);

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
    setLoadingComment(true);
    setMessage(null);
    try {
      const res = await postComment(slug, body);
      setMessage(res.message);
      setMessageTone("success");
      setBody("");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to post comment");
      setMessageTone("error");
    } finally {
      setLoadingComment(false);
    }
  }

  async function submitRating(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setLoadingRating(true);
    setMessage(null);
    try {
      const res = await ratePost(slug, rating, review || undefined);
      setMessage(res.message);
      setMessageTone("success");
      setAvg(res.data.average);
      load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to submit rating");
      setMessageTone("error");
    } finally {
      setLoadingRating(false);
    }
  }

  const displayRating = hoverRating || rating;

  return (
    <section className="mt-14 border-t border-border pt-12" aria-labelledby="discussion-heading">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-accent-2">Discussion</p>
          <h2 id="discussion-heading" className="mt-1 text-2xl font-semibold tracking-tight text-fg">
            Comments & reviews
          </h2>
          <p className="mt-2 max-w-lg text-sm text-fg-muted">
            Share feedback on this article. Comments are moderated before they appear.
          </p>
        </div>
        {count > 0 && avg !== null ? (
          <RatingSummary average={avg} count={count} />
        ) : null}
      </div>

      {message ? (
        <div
          role="status"
          className={cn(
            "mb-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm",
            messageTone === "success"
              ? "border-[hsl(var(--ok)/0.35)] bg-[hsl(var(--ok)/0.08)] text-fg"
              : "border-[hsl(var(--bad)/0.35)] bg-[hsl(var(--bad)/0.08)] text-fg",
          )}
        >
          <CheckCircle2
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0",
              messageTone === "success" ? "text-[hsl(var(--ok))]" : "text-[hsl(var(--bad))]",
            )}
          />
          {message}
        </div>
      ) : null}

      <ul className="mb-10 space-y-4">
        {comments.map((c) => (
          <li key={c.id}>
            <CommentCard comment={c} />
          </li>
        ))}
        {comments.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-border bg-card/20 px-6 py-10 text-center">
            <MessageSquare className="mx-auto h-8 w-8 text-fg-muted/50" aria-hidden />
            <p className="mt-3 text-sm font-medium text-fg">No comments yet</p>
            <p className="mt-1 text-sm text-fg-muted">Be the first to join the conversation.</p>
          </li>
        ) : null}
      </ul>

      {user ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <InteractionCard
            icon={MessageSquare}
            title="Leave a comment"
            description="Thoughts, questions, or tips for other readers."
            accent="indigo"
          >
            <form onSubmit={submitComment} className="space-y-4">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                required
                minLength={3}
                className={inputClass}
                placeholder="What did you think of this article?"
              />
              <button type="submit" disabled={loadingComment} className={primaryBtn}>
                <Send className="h-4 w-4" aria-hidden />
                {loadingComment ? "Posting…" : "Post comment"}
              </button>
            </form>
          </InteractionCard>

          <InteractionCard
            icon={Star}
            title="Rate this article"
            description="Quick stars plus an optional written review."
            accent="cyan"
          >
            <form onSubmit={submitRating} className="space-y-4">
              <div>
                <p className="mb-2 text-xs font-medium text-fg-muted">Your rating</p>
                <StarPicker
                  value={rating}
                  hover={hoverRating}
                  onChange={setRating}
                  onHover={setHoverRating}
                  onLeave={() => setHoverRating(0)}
                />
                <p className="mt-2 text-sm text-fg">
                  {displayRating} out of 5
                  {displayRating === 5 ? " — Excellent" : displayRating >= 4 ? " — Good" : ""}
                </p>
              </div>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={3}
                className={inputClass}
                placeholder="Optional: what made this helpful?"
              />
              <button type="submit" disabled={loadingRating} className={secondaryBtn}>
                <Star className="h-4 w-4" aria-hidden />
                {loadingRating ? "Saving…" : "Submit rating"}
              </button>
            </form>
          </InteractionCard>
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="hairline h-px w-full" />
          <CardBody className="flex flex-col items-center gap-5 py-10 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(var(--accent-1)/0.25)] to-[hsl(var(--accent-2)/0.15)]">
              <MessageSquare className="h-7 w-7 text-accent-1" aria-hidden />
            </div>
            <div className="flex-1">
              <p className="font-medium text-fg">Join the discussion</p>
              <p className="mt-1 text-sm text-fg-muted">
                Sign in with Google to comment, rate, and save your activity to your profile.
              </p>
            </div>
            <GoogleSignInButton redirect={`/blog/${slug}`} className="shrink-0" />
          </CardBody>
        </Card>
      )}
    </section>
  );
}

function RatingSummary({ average, count }: { average: number; count: number }) {
  const full = Math.round(average);
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/50 px-4 py-3">
      <div className="text-3xl font-semibold tabular-nums text-fg">{average.toFixed(1)}</div>
      <div>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              className={cn(
                "h-4 w-4",
                n <= full ? "fill-[hsl(var(--warn))] text-[hsl(var(--warn))]" : "text-fg-muted/30",
              )}
              aria-hidden
            />
          ))}
        </div>
        <p className="mt-0.5 text-xs text-fg-muted">
          {count} review{count === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}

function StarPicker({
  value,
  hover,
  onChange,
  onHover,
  onLeave,
}: {
  value: number;
  hover: number;
  onChange: (n: number) => void;
  onHover: (n: number) => void;
  onLeave: () => void;
}) {
  const active = hover || value;
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} stars`}
          onClick={() => onChange(n)}
          onMouseEnter={() => onHover(n)}
          onMouseLeave={onLeave}
          className="rounded-lg p-1 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent-2))]"
        >
          <Star
            className={cn(
              "h-8 w-8 transition",
              n <= active
                ? "fill-[hsl(var(--warn))] text-[hsl(var(--warn))]"
                : "text-fg-muted/25 hover:text-fg-muted/50",
            )}
          />
        </button>
      ))}
    </div>
  );
}

function InteractionCard({
  icon: Icon,
  title,
  description,
  accent,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accent: "indigo" | "cyan";
  children: React.ReactNode;
}) {
  const accentBar =
    accent === "indigo"
      ? "from-[hsl(var(--accent-1))] to-transparent"
      : "from-[hsl(var(--accent-2))] to-transparent";

  return (
    <Card className="group overflow-hidden transition hover:border-white/15">
      <div className={cn("h-1 w-full bg-gradient-to-r", accentBar)} />
      <CardBody className="space-y-5">
        <div className="flex gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border",
              accent === "indigo" ? "bg-[hsl(var(--accent-1)/0.12)]" : "bg-[hsl(var(--accent-2)/0.12)]",
            )}
          >
            <Icon
              className={cn("h-5 w-5", accent === "indigo" ? "text-accent-1" : "text-accent-2")}
              aria-hidden
            />
          </div>
          <div>
            <h3 className="font-semibold text-fg">{title}</h3>
            <p className="mt-0.5 text-sm text-fg-muted">{description}</p>
          </div>
        </div>
        {children}
      </CardBody>
    </Card>
  );
}

function CommentCard({ comment }: { comment: Comment }) {
  const initials = (comment.user?.name ?? "M")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="transition hover:border-white/12">
      <CardBody className="space-y-3">
        <div className="flex items-start gap-3">
          {comment.user?.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={comment.user.avatar}
              alt=""
              className="h-10 w-10 shrink-0 rounded-full border border-border object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-[hsl(var(--accent-1)/0.15)] text-xs font-semibold text-accent-1">
              {initials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-fg">{comment.user?.name ?? "Member"}</span>
              <time className="text-xs text-fg-muted" dateTime={comment.created_at}>
                {new Date(comment.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{comment.body}</p>
          </div>
        </div>
        {comment.replies?.length ? (
          <ul className="space-y-3 border-l border-border/80 pl-4 sm:ml-[3.25rem]">
            {comment.replies.map((r) => (
              <li key={r.id} className="text-sm">
                <span className="font-medium text-fg">{r.user?.name}</span>
                <span className="text-fg-muted"> · {r.body}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </CardBody>
    </Card>
  );
}

const inputClass = cn(
  "w-full resize-y rounded-xl border border-border bg-bg/40 px-4 py-3 text-sm text-fg placeholder:text-fg-muted/70",
  "transition focus:border-[hsl(var(--accent-1))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--accent-1))]",
);

const primaryBtn = cn(
  "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black",
  "shadow-[0_10px_30px_rgba(255,255,255,0.08)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
);

const secondaryBtn = cn(
  "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white/5 px-5 py-3 text-sm font-medium text-fg",
  "transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50",
);
