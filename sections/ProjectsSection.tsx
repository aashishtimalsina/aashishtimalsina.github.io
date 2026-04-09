"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { projects } from "@/lib/projects";
import { Card, CardBody } from "@/components/ui/Card";
import { TechBadge } from "@/components/ui/TechBadge";
import { cn } from "@/utils/cn";

function ProjectCard({
  p,
  variant,
}: {
  p: (typeof projects)[number];
  variant: "featured" | "standard";
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group h-full"
    >
      <Card className="h-full">
        <CardBody className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-fg-muted">
                {variant === "featured" ? (
                  <>
                    <Sparkles className="h-4 w-4 text-[hsl(var(--accent-2))]" />
                    Featured project
                  </>
                ) : (
                  <>Production build</>
                )}
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm text-fg-muted">{p.description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {p.githubUrl ? (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border bg-bg/30 p-2 text-fg-muted transition hover:bg-bg/60 hover:text-fg"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              ) : null}
              {p.liveUrl ? (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border bg-bg/30 p-2 text-fg-muted transition hover:bg-bg/60 hover:text-fg"
                  aria-label="Live demo"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.stack.slice(0, variant === "featured" ? 6 : 5).map((t) => (
              <TechBadge key={t}>{t}</TechBadge>
            ))}
          </div>

          <ul className={cn("mt-6 grid gap-2 text-sm text-fg-muted", variant === "featured" && "sm:grid-cols-2")}>
            {p.highlights.slice(0, variant === "featured" ? 4 : 3).map((h) => (
              <li key={h} className="flex items-start gap-2">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent-1))]" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </motion.div>
  );
}

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-fg-muted">Selected work</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Featured projects</h2>
          <p className="mt-2 max-w-2xl text-fg-muted">
            Real-world systems across APIs, deployments, and realtime services—built with a production mindset.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {featured.map((p) => (
          <ProjectCard key={p.slug} p={p} variant="featured" />
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {rest.map((p) => (
          <ProjectCard key={p.slug} p={p} variant="standard" />
        ))}
      </div>
    </div>
  );
}

