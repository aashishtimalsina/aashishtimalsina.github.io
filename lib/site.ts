import { defaultSite, type SiteConfig } from "./site-defaults";

export type { SiteConfig };
export { defaultSite };

/** @deprecated Prefer getSite() on the server or useSite() in client components. */
export const site = defaultSite;

export function absoluteUrl(path: string, baseUrl: string = defaultSite.url) {
  const base = baseUrl.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
