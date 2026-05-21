import type { Project } from "@/lib/projects";
import { API_URL } from "@/lib/api/http";

type ApiProject = {
  slug: string;
  title: string;
  description: string;
  highlights: string[];
  stack: string[];
  image?: string | null;
  github_url?: string | null;
  live_url?: string | null;
  featured: boolean;
};

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`, {
    next: { revalidate: 60 },
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Projects API error: ${res.status}`);
  }

  const json = (await res.json()) as { data: ApiProject[] };

  return json.data.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    highlights: p.highlights ?? [],
    stack: p.stack ?? [],
    image: p.image ?? undefined,
    githubUrl: p.github_url ?? undefined,
    liveUrl: p.live_url ?? undefined,
    featured: p.featured,
  }));
}
