import type { SiteConfig } from "@/lib/site-defaults";
import { API_URL } from "@/lib/api/http";

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
