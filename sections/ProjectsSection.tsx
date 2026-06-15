"use client";

import { ExternalLink, Github } from "lucide-react";
import { projects as defaultProjects, type Project } from "@/lib/projects";
import { OptimizedImage } from "@/components/seo/OptimizedImage";
import { Card, CardBody } from "@/components/ui/Card";
import { TechBadge } from "@/components/ui/TechBadge";
import { cn } from "@/utils/cn";

function ProjectCard({
  p,
  variant,
}: {
  p: Project;
  variant: "featured" | "standard";
}) {
  return (
    <Card className="h-full overflow-hidden">
      {p.image ? (
        <div className="relative aspect-[16/9] w-full border-b border-border bg-bg/30">
          <OptimizedImage
            src={p.image}
            alt={p.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : null}
      <CardBody className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {p.githubUrl ? (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 text-fg-muted transition hover:text-fg"
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
                className="rounded-lg p-2 text-fg-muted transition hover:text-fg"
                aria-label="Live demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.slice(0, variant === "featured" ? 6 : 5).map((t) => (
            <TechBadge key={t}>{t}</TechBadge>
          ))}
        </div>

        {p.highlights.length > 0 ? (
          <ul
            className={cn(
              "mt-4 grid gap-1.5 text-sm text-fg-muted",
              variant === "featured" && "sm:grid-cols-2",
            )}
          >
            {p.highlights.slice(0, variant === "featured" ? 4 : 3).map((h) => (
              <li key={h} className="flex items-start gap-2">
                <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-fg-muted" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </CardBody>
    </Card>
  );
}

type Props = {
  projects?: Project[];
  heading?: string | null;
  subheading?: string | null;
};

export function ProjectsSection({
  projects = defaultProjects,
  heading,
  subheading,
}: Props) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {heading ?? "Featured projects"}
        </h2>
        {subheading ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted sm:text-base">
            {subheading}
          </p>
        ) : null}
      </div>

      {featured.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-2 lg:gap-5">
          {featured.map((p) => (
            <ProjectCard key={p.slug} p={p} variant="featured" />
          ))}
        </div>
      ) : null}

      {rest.length > 0 ? (
        <div className={cn("grid gap-4 sm:gap-5 md:grid-cols-2", featured.length > 0 && "mt-6 sm:mt-8")}>
          {rest.map((p) => (
            <ProjectCard key={p.slug} p={p} variant="standard" />
          ))}
        </div>
      ) : null}
    </div>
  );
}
