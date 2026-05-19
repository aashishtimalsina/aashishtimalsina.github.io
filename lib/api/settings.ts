import type { SiteConfig } from "@/lib/site-defaults";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export async function fetchSiteSettings(): Promise<SiteConfig> {
  const res = await fetch(`${API_URL}/settings`, {
    next: { revalidate: 60 },
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Settings API error: ${res.status}`);
  }

  const json = (await res.json()) as { data: SiteConfig };
  return json.data;
}
