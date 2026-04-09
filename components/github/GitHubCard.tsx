"use client";

import { useEffect, useMemo, useState } from "react";
import { Github, GitCommit, Star, GitFork, RefreshCw } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { TechBadge } from "@/components/ui/TechBadge";
import { cn } from "@/utils/cn";

type ApiData = {
  username: string;
  repos: {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stars: number;
    forks: number;
    updated_at: string;
  }[];
  events: { id: string; type: string; created_at: string; repo: string | null; message: string | null }[];
  error?: string;
};

function timeAgo(iso: string) {
  const t = new Date(iso).getTime();
  const s = Math.max(1, Math.floor((Date.now() - t) / 1000));
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  if (m > 0) return `${m}m ago`;
  return `${s}s ago`;
}

const tabs = ["repos", "activity"] as const;
type Tab = (typeof tabs)[number];

export function GitHubCard({ className }: { className?: string }) {
  const [tab, setTab] = useState<Tab>("repos");
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const repoCount = data?.repos?.length ?? 0;
  const activityCount = data?.events?.length ?? 0;
  const ok = !!data && !data.error;

  const load = async (signal?: AbortSignal) => {
    const res = await fetch("/api/github", { signal });
    const json = (await res.json()) as ApiData;
    setData(json);
  };

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    load(ctrl.signal)
      .catch(() => null)
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  const headerBadge = useMemo(() => {
    if (loading) return "loading";
    if (!ok) return "rate-limited";
    return "live";
  }, [loading, ok]);

  return (
    <Card className={cn("h-full", className)}>
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-fg-muted">
              <Github className="h-4 w-4" />
              GitHub activity
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">github.com/aashishtimalsina</h3>
            <p className="mt-2 text-sm text-fg-muted">
              {loading ? "Fetching repositories and activity…" : "Live snapshot of repos + recent public events."}
            </p>
          </div>
          <TechBadge className={cn(ok ? "text-fg" : "text-fg-muted")}>{headerBadge}</TechBadge>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "rounded-xl border border-border px-3 py-1.5 text-xs transition",
                tab === t ? "bg-white/10 text-fg" : "bg-bg/20 text-fg-muted hover:bg-bg/35"
              )}
            >
              {t === "repos" ? `Repos (${repoCount})` : `Activity (${activityCount})`}
            </button>
          ))}

          <button
            type="button"
            onClick={async () => {
              setRefreshing(true);
              try {
                await load();
              } finally {
                setRefreshing(false);
              }
            }}
            className={cn(
              "ml-auto inline-flex items-center gap-2 rounded-xl border border-border bg-bg/20 px-3 py-1.5 text-xs text-fg-muted transition hover:bg-bg/35",
              refreshing && "opacity-70"
            )}
          >
            <RefreshCw className={cn("h-3.5 w-3.5", refreshing && "animate-spin")} />
            Refresh
          </button>
        </div>

        <div className="mt-5">
          {tab === "repos" ? (
            <div className="grid gap-3">
              {(loading ? Array.from({ length: 3 }) : data?.repos ?? []).map((r, idx) => {
                if (loading) {
                  return (
                    <div
                      key={idx}
                      className="relative overflow-hidden rounded-2xl border border-border bg-bg/20 p-4"
                    >
                      <div className="absolute inset-0 -translate-x-[20%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)] animate-shimmer" />
                      <div className="h-4 w-44 rounded bg-white/5" />
                      <div className="mt-3 h-3 w-72 rounded bg-white/5" />
                    </div>
                  );
                }

                return (
                  <a
                    key={r.id}
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-border bg-bg/20 p-4 transition hover:-translate-y-0.5 hover:bg-bg/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium text-fg">{r.name}</div>
                        <div className="mt-1 text-sm text-fg-muted line-clamp-2">
                          {r.description ?? "No description provided."}
                        </div>
                      </div>
                      <div className="shrink-0 text-xs text-fg-muted">{timeAgo(r.updated_at)}</div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-fg-muted">
                      {r.language ? <TechBadge>{r.language}</TechBadge> : null}
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" /> {r.stars}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" /> {r.forks}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-3">
              {(loading ? Array.from({ length: 4 }) : data?.events ?? []).map((e, idx) => {
                if (loading) {
                  return (
                    <div
                      key={idx}
                      className="relative overflow-hidden rounded-2xl border border-border bg-bg/20 p-4"
                    >
                      <div className="absolute inset-0 -translate-x-[20%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)] animate-shimmer" />
                      <div className="h-3 w-64 rounded bg-white/5" />
                      <div className="mt-3 h-3 w-80 rounded bg-white/5" />
                    </div>
                  );
                }

                return (
                  <div key={e.id} className="rounded-2xl border border-border bg-bg/20 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm text-fg">
                        <span className="font-medium">{e.type.replace("Event", "")}</span>
                        {e.repo ? <span className="text-fg-muted"> • {e.repo}</span> : null}
                      </div>
                      <div className="shrink-0 text-xs text-fg-muted">{timeAgo(e.created_at)}</div>
                    </div>
                    <div className="mt-2 flex items-start gap-2 text-sm text-fg-muted">
                      <GitCommit className="mt-0.5 h-4 w-4" />
                      <div className="line-clamp-2">
                        {e.message ?? "Public activity event (no commit message available)."}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

