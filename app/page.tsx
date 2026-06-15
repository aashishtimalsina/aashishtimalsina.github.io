import Image from "next/image";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { fetchProjects } from "@/lib/api/projects";
import { getSite } from "@/lib/get-site";
import { projects as fallbackProjects } from "@/lib/projects";

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
        <Section className="pt-8 sm:pt-12">
          <Container>
            <div className="max-w-2xl">
              {site.avatar ? (
                <div className="relative mb-6 h-14 w-14 overflow-hidden rounded-full border border-border sm:h-16 sm:w-16">
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

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {site.name}
              </h1>
              <p className="mt-2 text-lg text-fg-muted sm:text-xl">{site.headline}</p>
              <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
                {site.summary}. Tutorials on the{" "}
                <a href="/blog" className="text-fg underline decoration-border hover:decoration-fg">
                  blog
                </a>{" "}
                come from production, not theory.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                <Button href="/services" variant="primary">
                  View Projects
                </Button>
                <Button href="/contact" variant="secondary">
                  Contact
                </Button>
                <Button href={site.github} target="_blank" rel="noreferrer" variant="ghost">
                  GitHub
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="projects" className="pt-0">
          <Container>
            <ProjectsSection
              projects={projects}
              heading={site.projects_heading}
              subheading={site.projects_subheading}
            />
          </Container>
        </Section>

        <Section id="contact" className="pt-0">
          <Container>
            <div className="rounded-xl border border-border p-5 sm:p-6">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Contact</h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-fg-muted sm:text-base">
                Ready to discuss a project? Email{" "}
                <a href={`mailto:${site.email}`} className="text-fg underline">
                  {site.email}
                </a>{" "}
                or use the contact form.
              </p>
              <Button href="/contact" variant="primary" className="mt-4">
                Get in touch
              </Button>
            </div>
          </Container>
        </Section>
      </main>
    </SiteLayout>
  );
}
