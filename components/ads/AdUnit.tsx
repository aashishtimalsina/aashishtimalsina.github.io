"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

const AD_CLIENT = "ca-pub-6811311873085870";
const DEFAULT_SLOT = "7844999254";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdUnitProps = {
  slot?: string;
  className?: string;
};

/**
 * Responsive Google AdSense unit. The adsbygoogle.js loader is added once in
 * the root layout <head>; each unit only needs the <ins> plus a push() call.
 */
export function AdUnit({ slot = DEFAULT_SLOT, className }: AdUnitProps) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.getAttribute("data-ad-status")) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle not loaded (blocked or offline) — render nothing
    }
  }, []);

  return (
    <div className={cn("my-8 overflow-hidden", className)}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
