import { cache } from "react";
import { fetchSiteSettings } from "@/lib/api/settings";
import { defaultSite, type SiteConfig } from "@/lib/site-defaults";

export const getSite = cache(async (): Promise<SiteConfig> => {
  try {
    return await fetchSiteSettings();
  } catch {
    return defaultSite;
  }
});
