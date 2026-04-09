"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import { site } from "@/lib/site";

const links = [
  { href: "#github", label: "GitHub" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const list = useMemo(() => links, []);

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
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-medium tracking-tight">
            <span className="text-fg">{site.name}</span>
            <span className="ml-2 hidden text-sm text-fg-muted sm:inline">
              {site.role}
            </span>
          </Link>

          <nav className="hidden items-center gap-4 text-sm md:flex">
            {list.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-2 py-1 text-fg-muted transition hover:bg-white/5 hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
