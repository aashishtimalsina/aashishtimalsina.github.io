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
  description: `${site.name} builds and deploys production software — business systems, APIs, dashboards, and reliable infrastructure.`,
  path: "/services",
});

const services = [
  {
    title: "End-to-end product delivery",
    description:
      "I take a project from requirements → build → deployment. Clean UX, backend logic, admin workflows, and production setup included.",
    tags: ["Plan", "Build", "Ship", "Iterate"],
  },
  {
    title: "Backend systems & APIs",
    description:
      "Secure APIs, integrations, payments, and data modeling. Built for real users, real traffic, and long-term maintainability.",
    tags: ["Auth", "Payments", "Integrations", "Data"],
  },
  {
    title: "Deployment & operations",
    description:
      "Deployments, environments, CI/CD, monitoring basics, and performance hardening so your system stays reliable after launch.",
    tags: ["Deploy", "CI/CD", "Reliability", "Performance"],
  },
  {
    title: "Mobile-ready backends",
    description:
      "APIs designed for mobile apps: auth, uploads, notifications, and third-party integrations with stable versioning.",
    tags: ["Uploads", "Webhooks", "Versioning", "Notifications"],
  },
  {
    title: "Realtime & dashboards",
    description:
      "Live dashboards and realtime features when you need them — without sacrificing reliability and observability.",
    tags: ["Realtime", "Dashboards", "Events", "Observability"],
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
            description="I build and deploy software that runs in production — clear scope, clean delivery, and reliable operations."
          />
        </Section>

        <Section className="pt-0">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((s) => (
                <article
                  key={s.title}
                  className="rounded-xl border border-border p-5 sm:p-6"
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
