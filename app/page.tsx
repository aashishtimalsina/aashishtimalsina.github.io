import Image from "next/image";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ProductStack } from "@/components/dev/ProductStack";
import { TerminalCard } from "@/components/dev/TerminalCard";
import { SkillsCard } from "@/components/dev/SkillsCard";
import { GitHubCard } from "@/components/github/GitHubCard";
import { DashboardCard } from "@/components/dev/DashboardCard";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { fetchProjects } from "@/lib/api/projects";
import { getSite } from "@/lib/get-site";
import { projects as fallbackProjects } from "@/lib/projects";
import { stackSummary } from "@/lib/stack";

export default async function HomePage() {
  const site = await getSite();
  let projects = fallbackProjects;
  try {
    projects = await fetchProjects();
  } catch {
    // use static fallback when API is offline
  }

  return (
    <SiteLayout>
      <main>
        <Section className="pt-10">
          <Container>
            <div className="grid gap-5 md:grid-cols-12 md:items-start">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-10 shadow-glow backdrop-blur sm:p-12 md:col-span-6">
                {site.hero_image ? (
                  <div className="pointer-events-none absolute inset-0">
                    <Image
                      src={site.hero_image}
                      alt=""
                      fill
                      className="object-cover opacity-20"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/70 to-transparent" />
                  </div>
                ) : (
                  <div className="pointer-events-none absolute inset-0 opacity-35 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
                    <div className="h-full w-full bg-[linear-gradient(to_right,rgba(124,58,237,0.42),rgba(14,165,233,0.22),transparent)]" />
                  </div>
                )}

                <div className="relative">
                  <div className="flex flex-wrap items-center gap-4">
                    {site.avatar ? (
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border shadow-glow">
                        <Image
                          src={site.avatar}
                          alt={site.name}
                          fill
                          className="object-cover"
                          priority
                          sizes="64px"
                        />
                      </div>
                    ) : null}
                    <ProductStack compact />
                  </div>

                  <h1 className="mt-7 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                    <span className="text-gradient">{site.name}</span>
                  </h1>
                  <p className="mt-3 text-lg text-fg-muted sm:text-xl">{site.headline}</p>
                  <p className="mt-6 max-w-2xl text-pretty text-fg-muted">
                    <span className="text-fg">{site.summary}</span>. {stackSummary} — managed from
                    the CMS. Tutorials on the{" "}
                    <a
                      href="/blog"
                      className="text-accent-1 underline decoration-border hover:decoration-fg"
                    >
                      blog
                    </a>{" "}
                    come from production, not theory.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <Button href="/services" variant="primary">
                      View Projects
                    </Button>
                    <Button href="/contact" variant="secondary">
                      Contact Me
                    </Button>
                    <Button href={site.github} target="_blank" rel="noreferrer" variant="ghost">
                      View GitHub
                    </Button>
                  </div>

                  <div className="mt-10 h-px w-full hairline" />

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-border bg-bg/25 p-5">
                      <div className="text-xs text-fg-muted">Backend</div>
                      <div className="mt-2 text-sm text-fg">Laravel API, Filament CMS, SaaS</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-bg/25 p-5">
                      <div className="text-xs text-fg-muted">Frontend</div>
                      <div className="mt-2 text-sm text-fg">Next.js SSR, blog, server-side SEO</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-bg/25 p-5">
                      <div className="text-xs text-fg-muted">Delivery</div>
                      <div className="mt-2 text-sm text-fg">Cloudflare CDN, AVIF images, CI/CD</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4">
                <SkillsCard dense />
              </div>

              <div className="md:col-span-2">
                <TerminalCard compact />
              </div>
            </div>
          </Container>
        </Section>

        <Section id="github" className="pt-0">
          <Container>
            <div className="grid gap-5 lg:grid-cols-2">
              <GitHubCard />
              <DashboardCard />
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

        <Section id="contact">
          <Container>
            <div className="rounded-3xl border border-border bg-card/40 p-8 shadow-glow">
              <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
              <p className="mt-3 max-w-xl text-fg-muted">
                Ready to discuss a project? Visit the contact page or email{" "}
                <a href={`mailto:${site.email}`} className="text-accent-1 underline">
                  {site.email}
                </a>
                .
              </p>
              <Button href="/contact" variant="primary" className="mt-6">
                Go to Contact Page
              </Button>
            </div>
          </Container>
        </Section>
      </main>
    </SiteLayout>
  );
}
