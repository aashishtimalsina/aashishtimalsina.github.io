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
  description: `${site.name} builds production Laravel & SaaS systems in Nepal — multi-tenant apps, APIs, payments, and DevOps. Real tutorials from real shipped projects.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteLayout>
      <main>
        <Section className="pt-10">
          <PageHero
            title="About Me"
            description={`I'm ${site.name} — I write about what I ship: Laravel SaaS, multi-tenant systems, and production infrastructure.`}
          />
        </Section>

        <Section className="pt-0">
          <Container>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6 text-fg-muted">
                <p className="text-lg text-fg">{site.summary}</p>
                <p>
                  My niche is <strong className="text-fg">Laravel + SaaS</strong>. I have built
                  multi-tenant HRM systems, subscription apps with Stripe and local payment gateways,
                  and APIs that Flutter and Next.js frontends depend on every day.
                </p>
                <p>
                  That is my advantage: these tutorials come from production code, not copied
                  documentation. When I write about tenancy, Sanctum auth, or Filament admin panels,
                  it is because I solved those problems for paying clients and my own products.
                </p>
                <p>
                  The stack I ship and teach: <strong className="text-fg">Laravel backend</strong>,{" "}
                  <strong className="text-fg">Next.js frontend</strong>, headless or{" "}
                  <strong className="text-fg">MDX blog</strong>,{" "}
                  <strong className="text-fg">Cloudflare CDN</strong>, Next.js image optimization,
                  and <strong className="text-fg">server-side SEO</strong>. This portfolio runs that
                  stack in production.
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
