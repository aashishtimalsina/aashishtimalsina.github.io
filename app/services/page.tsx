import type { Metadata } from "next";
import { fetchProjects } from "@/lib/api/projects";
import { getSite } from "@/lib/get-site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { TechBadge } from "@/components/ui/TechBadge";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/page-metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Services & Projects",
  description: `${site.name} builds Laravel backends, Next.js frontends, SEO blogs, and Cloudflare-backed deployments — production systems, not demos.`,
  path: "/services",
});

const services = [
  {
    title: "Laravel + Next.js Products",
    description:
      "Full-stack SaaS and marketing sites: Laravel API, Filament admin, Next.js App Router, headless or MDX blog, server-side SEO, and image optimization.",
    tags: ["Laravel", "Next.js", "Filament", "SSR SEO"],
  },
  {
    title: "Backend API Development",
    description:
      "RESTful APIs with Laravel — Sanctum auth, multi-tenant SaaS, payments (eSewa, Khalti, Stripe), and OpenAPI documentation.",
    tags: ["Laravel", "Sanctum", "SaaS", "PostgreSQL"],
  },
  {
    title: "DevOps & Deployment",
    description:
      "Docker, Nginx, CI/CD pipelines, GitHub Actions, and server setup on DigitalOcean or Ubuntu VPS.",
    tags: ["Docker", "CI/CD", "Nginx", "DigitalOcean"],
  },
  {
    title: "Mobile App Backends",
    description:
      "APIs for Flutter apps: auth, uploads, push notifications, payments, and third-party integrations.",
    tags: ["Flutter API", "File uploads", "Webhooks"],
  },
  {
    title: "Real-time Applications",
    description:
      "WebSocket services, live dashboards, and event streaming for low-latency user experiences.",
    tags: ["WebSockets", "Node.js", "Redis"],
  },
] as const;

export default async function ServicesPage() {
  const site = await getSite();
  let projects;
  try {
    projects = await fetchProjects();
  } catch {
    projects = undefined;
  }

  return (
    <SiteLayout>
      <main>
        <Section className="pt-10">
          <PageHero
            title="Services & Projects"
            description="Laravel backend, Next.js frontend, SEO blogs, Cloudflare CDN — shipped as one production system."
          />
        </Section>

        <Section className="pt-0">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((s) => (
                <article
                  key={s.title}
                  className="rounded-2xl border border-border bg-card/40 p-6 shadow-glow"
                >
                  <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
                  <p className="mt-3 text-sm text-fg-muted">{s.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <TechBadge key={t}>{t}</TechBadge>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button href="/contact" variant="primary">
                Discuss Your Project
              </Button>
            </div>
          </Container>
        </Section>

        <Section id="projects">
          <Container>
            <ProjectsSection
              projects={projects}
              heading={site.projects_heading}
              subheading={site.projects_subheading}
            />
          </Container>
        </Section>
      </main>
    </SiteLayout>
  );
}
