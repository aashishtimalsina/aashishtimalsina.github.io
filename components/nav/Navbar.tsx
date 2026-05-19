"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { mainNav } from "@/lib/navigation";
import { useSite } from "@/components/providers/SiteProvider";
import { cn } from "@/utils/cn";

export function Navbar() {
  const site = useSite();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b border-transparent transition",
          scrolled && "border-border bg-bg/75 backdrop-blur",
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3 sm:py-4">
          <Link href="/" className="shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent-2))]">
            <SiteLogo />
          </Link>

          <nav className="hidden items-center gap-1 text-sm md:flex" aria-label="Main">
            {mainNav.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-2.5 py-1 transition",
                    active
                      ? "bg-white/10 text-fg"
                      : "text-fg-muted hover:bg-white/5 hover:text-fg",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            {site.linkedin ? (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="ml-1 rounded-lg px-2.5 py-1 text-fg-muted transition hover:bg-white/5 hover:text-fg"
              >
                LinkedIn
              </a>
            ) : null}
          </nav>
        </div>
      </div>
    </div>
  );
}
