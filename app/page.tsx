import { site } from "@/lib/site";
import { Navbar } from "@/components/nav/Navbar";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { TechBadge } from "@/components/ui/TechBadge";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { TerminalCard } from "@/components/dev/TerminalCard";
import { SkillsCard } from "@/components/dev/SkillsCard";
import { GitHubCard } from "@/components/github/GitHubCard";
import { DashboardCard } from "@/components/dev/DashboardCard";

export default function HomePage() {
  return (
    <main>
      <Navbar />

      <Section className="pt-10">
        <Container>
          <div className="grid gap-5 md:grid-cols-12 md:items-start">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-10 shadow-glow backdrop-blur sm:p-12 md:col-span-6">
              <div className="pointer-events-none absolute inset-0 opacity-35 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
                <div className="h-full w-full bg-[linear-gradient(to_right,rgba(124,58,237,0.42),rgba(14,165,233,0.22),transparent)]" />
              </div>

              <div className="relative">
                <div className="flex flex-wrap items-center gap-2">
                  <TechBadge>Backend APIs</TechBadge>
                  <TechBadge>DevOps & CI/CD</TechBadge>
                  <TechBadge>Mobile Backend</TechBadge>
                  <TechBadge>Realtime Systems</TechBadge>
                </div>

                <h1 className="mt-7 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                  <span className="text-gradient">{site.name}</span>
                </h1>
                <p className="mt-3 text-lg text-fg-muted sm:text-xl">{site.headline}</p>
                <p className="mt-6 max-w-2xl text-pretty text-fg-muted">
                  <span className="text-fg">{site.summary}</span>. I build production-grade backend
                  services, authentication systems, microservice APIs, deployment automation, and
                  real-time apps.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href="#projects" variant="primary">
                    View Projects
                  </Button>
                  <Button href="#contact" variant="secondary">
                    Contact Me
                  </Button>
                  <Button href={site.github} target="_blank" rel="noreferrer" variant="ghost">
                    View GitHub
                  </Button>
                </div>

                <div className="mt-10 h-px w-full hairline" />

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-bg/25 p-5">
                    <div className="text-xs text-fg-muted">Focus</div>
                    <div className="mt-2 text-sm text-fg">
                      Backend systems, APIs, deployment automation
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-bg/25 p-5">
                    <div className="text-xs text-fg-muted">Operating mode</div>
                    <div className="mt-2 text-sm text-fg">Reliable, measurable, fast</div>
                  </div>
                  <div className="rounded-2xl border border-border bg-bg/25 p-5">
                    <div className="text-xs text-fg-muted">Delivery</div>
                    <div className="mt-2 text-sm text-fg">CI/CD, Docker, Nginx, Ubuntu</div>
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
          <ProjectsSection />
        </Container>
      </Section>

      <Section id="contact">
        <Container>
          <div className="rounded-3xl border border-border bg-card/40 p-8 shadow-glow">
            <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
            <p className="mt-3 text-fg-muted">
              Email:{" "}
              <a
                className="underline decoration-border hover:decoration-fg"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
              <span className="mx-2 text-fg-muted/60">•</span>
              Phone/WhatsApp:{" "}
              <a
                className="underline decoration-border hover:decoration-fg"
                href={`tel:${site.phone}`}
              >
                {site.phone}
              </a>
            </p>
            <p className="mt-2 text-fg-muted">
              GitHub:{" "}
              <a
                className="underline decoration-border hover:decoration-fg"
                href={site.github}
                target="_blank"
                rel="noreferrer"
              >
                {site.github}
              </a>
            </p>
            <p className="mt-2 text-fg-muted">
              LinkedIn:{" "}
              <a
                className="underline decoration-border hover:decoration-fg"
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                {site.linkedin}
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}

