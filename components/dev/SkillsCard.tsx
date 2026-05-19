"use client";

import { useMemo, useState } from "react";
import { Card, CardBody } from "@/components/ui/Card";
import { TechBadge } from "@/components/ui/TechBadge";
import { cn } from "@/utils/cn";

const skills = [
  {
    title: "Laravel + Next.js",
    items: [
      "Laravel API + Filament CMS",
      "Next.js App Router (SSR/ISR)",
      "Headless blog + server-side SEO",
      "MDX content (static / hybrid)",
      "Cloudflare CDN & edge caching",
      "Next.js Image (AVIF/WebP)",
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      "Laravel SaaS & multi-tenant",
      "Sanctum API authentication",
      "REST APIs & OpenAPI",
      "Payment gateways (eSewa, Khalti)",
      "PostgreSQL / MySQL",
    ],
  },
  {
    title: "DevOps & Infra",
    items: [
      "DigitalOcean servers",
      "Ubuntu Linux servers",
      "Nginx configuration",
      "Docker containerization",
      "CI/CD pipelines",
      "GitHub Actions",
    ],
  },
  {
    title: "Mobile",
    items: ["Flutter Mobile Applications", "Mobile App Backend APIs", "API integrations for mobile apps"],
  },
  {
    title: "Realtime",
    items: ["WebSockets", "Real-time data streaming", "Socket based applications"],
  },
  {
    title: "Frontend",
    items: ["React JS", "Next JS", "TypeScript", "Tailwind CSS"],
  },
] as const;

export function SkillsCard({ dense = false }: { dense?: boolean }) {
  const [active, setActive] = useState<(typeof skills)[number]["title"]>(skills[0].title);
  const activeCategory = useMemo(
    () => skills.find((s) => s.title === active) ?? skills[0],
    [active]
  );

  return (
    <div className="group">
      <Card className="h-full">
        <CardBody className={dense ? "p-6" : undefined}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-fg-muted">Skill stack</div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">Core capabilities</h3>
            </div>
            <TechBadge>5+ years</TechBadge>
          </div>

          {dense ? (
            <div className="mt-5">
              <div className="flex flex-wrap gap-2">
                {skills.map((c) => (
                  <button
                    key={c.title}
                    type="button"
                    onClick={() => setActive(c.title)}
                    className={cn(
                      "rounded-xl border border-border px-3 py-1.5 text-xs transition",
                      active === c.title
                        ? "bg-white/10 text-fg"
                        : "bg-bg/20 text-fg-muted hover:bg-bg/35"
                    )}
                  >
                    {c.title}
                  </button>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-border bg-bg/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-fg">{activeCategory.title}</div>
                  <TechBadge>{activeCategory.items.length} skills</TechBadge>
                </div>
                <ul className="mt-3 grid gap-2 text-sm text-fg-muted">
                  {activeCategory.items.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent-1))]" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {skills
                  .filter((s) => s.title !== activeCategory.title)
                  .slice(0, 4)
                  .map((s) => (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => setActive(s.title)}
                      className="rounded-2xl border border-border bg-bg/15 p-3 text-left transition hover:bg-bg/25"
                    >
                      <div className="text-xs text-fg-muted">Next</div>
                      <div className="mt-1 text-sm font-medium text-fg">{s.title}</div>
                      <div className="mt-1 text-xs text-fg-muted">{s.items[0]}</div>
                    </button>
                  ))}
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {skills.map((c) => (
                <div key={c.title} className="rounded-2xl border border-border bg-bg/20 p-4">
                  <div className="text-sm font-medium text-fg">{c.title}</div>
                  <ul className="mt-3 grid gap-2 text-sm text-fg-muted">
                    {c.items.map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent-1))]" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

