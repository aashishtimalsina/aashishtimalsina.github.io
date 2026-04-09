import { NextResponse } from "next/server";

const username = "aashishtimalsina";

type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

type Event = {
  id: string;
  type: string;
  created_at: string;
  repo?: { name: string; url: string };
  payload?: { commits?: { sha: string; message: string }[] };
};

async function gh<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "aashish-timalsina-portfolio",
    },
    // Cache on the server for performance + rate limits
    next: { revalidate: 900 },
  });

  if (!res.ok) {
    throw new Error(`GitHub request failed (${res.status})`);
  }

  return (await res.json()) as T;
}

export async function GET() {
  try {
    const [repos, events] = await Promise.all([
      gh<Repo[]>(
        `https://api.github.com/users/${username}/repos?per_page=8&sort=updated`
      ),
      gh<Event[]>(
        `https://api.github.com/users/${username}/events/public?per_page=12`
      ),
    ]);

    const topRepos = repos
      .filter((r) => !r.name.toLowerCase().includes("fork"))
      .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
      .slice(0, 6)
      .map((r) => ({
        id: r.id,
        name: r.name,
        full_name: r.full_name,
        html_url: r.html_url,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updated_at: r.updated_at,
      }));

    const recent = events.slice(0, 10).map((e) => ({
      id: e.id,
      type: e.type,
      created_at: e.created_at,
      repo: e.repo?.name ?? null,
      message: e.payload?.commits?.[0]?.message ?? null,
    }));

    return NextResponse.json(
      { username, repos: topRepos, events: recent },
      { headers: { "Cache-Control": "public, max-age=0, s-maxage=900" } }
    );
  } catch (err) {
    return NextResponse.json(
      { username, repos: [], events: [], error: "github_fetch_failed" },
      { status: 200, headers: { "Cache-Control": "public, max-age=0, s-maxage=60" } }
    );
  }
}

