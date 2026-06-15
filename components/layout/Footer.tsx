"use client";

import Link from "next/link";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { footerNav } from "@/lib/navigation";
import { useSite } from "@/components/providers/SiteProvider";

export function Footer() {
  const site = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <SiteLogo showRole />
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{site.summary}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 sm:gap-12">
            <div>
              <p className="font-medium text-fg">Site</p>
              <ul className="mt-3 space-y-2">
                {footerNav.site.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-fg-muted transition hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-medium text-fg">Legal</p>
              <ul className="mt-3 space-y-2">
                {footerNav.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-fg-muted transition hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-medium text-fg">Social</p>
              <ul className="mt-3 space-y-2">
                {site.github ? (
                  <li>
                    <a
                      href={site.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-fg-muted transition hover:text-fg"
                    >
                      GitHub
                    </a>
                  </li>
                ) : null}
                {site.linkedin ? (
                  <li>
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-fg-muted transition hover:text-fg"
                    >
                      LinkedIn
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}</p>
          <a href={`mailto:${site.email}`} className="transition hover:text-fg">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
