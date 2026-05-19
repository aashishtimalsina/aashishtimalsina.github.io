"use client";

import Link from "next/link";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { footerNav } from "@/lib/navigation";
import { useSite } from "@/components/providers/SiteProvider";

export function Footer() {
  const site = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <SiteLogo className="mb-4" showRole />
            <p className="mt-2 text-sm text-fg-muted">{site.summary}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-fg-muted">Site</p>
            <ul className="mt-4 space-y-2 text-sm">
              {footerNav.site.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-fg-muted transition hover:text-fg hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-fg-muted">Legal</p>
            <ul className="mt-4 space-y-2 text-sm">
              {footerNav.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-fg-muted transition hover:text-fg hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-8 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>
            <a href={`mailto:${site.email}`} className="hover:text-fg hover:underline">
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
