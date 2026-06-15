import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SkillsCard } from "@/components/dev/SkillsCard";
import { ProductStack } from "@/components/dev/ProductStack";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/page-metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Me",
  description: `${site.name} builds and deploys production software in Nepal — business systems, APIs, and reliable operations. Real lessons from shipped work.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteLayout>
      <main>
        <Section className="pt-10">
          <PageHero
            title="About Me"
            description={`I'm ${site.name} — I build and deploy production systems, and I write about what I learn while shipping.`}
          />
        </Section>

        <Section className="pt-0">
          <Container>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6 text-fg-muted">
                <p className="text-lg text-fg">{site.summary}</p>
                <p>
                  I focus on outcomes: systems that are stable, maintainable, and easy for teams to
                  operate. I have built HRM and business tools, subscription workflows, payments,
                  and APIs that apps depend on every day.
                </p>
                <p>
                  My advantage is simple: I ship. I design, build, deploy, and support systems in
                  production, so the lessons here come from real constraints—not theory.
                </p>
                <p>
                  What you get when you work with me: clear communication, practical architecture,
                  secure auth, clean data models, and deployments that don’t break.
                </p>
                <p>
                  Real growth comes from SEO traffic compounding, consistent publishing, and going
                  deep in one niche. That is how developers turn expertise into freelance leads,
                  remote roles, and micro-SaaS revenue.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button href="/blog" variant="primary">
                    Read the Blog
                  </Button>
                  <Button href="/services" variant="secondary">
                    View Services
                  </Button>
                  <Button href="/contact" variant="ghost">
                    Work With Me
                  </Button>
                </div>
              </div>
              <SkillsCard />
            </div>
            <div className="mt-12">
              <h2 className="text-2xl font-semibold tracking-tight">Production stack</h2>
              <p className="mt-2 max-w-2xl text-fg-muted">
                What clients hire me to build — and what I document on the blog.
              </p>
              <div className="mt-6">
                <ProductStack />
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </SiteLayout>
  );
}
