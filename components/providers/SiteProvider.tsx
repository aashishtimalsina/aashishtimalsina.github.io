"use client";

import { createContext, useContext } from "react";
import { defaultSite, type SiteConfig } from "@/lib/site-defaults";

const SiteContext = createContext<SiteConfig>(defaultSite);

export function SiteProvider({
  site,
  children,
}: {
  site: SiteConfig;
  children: React.ReactNode;
}) {
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export function useSite() {
  return useContext(SiteContext);
}
