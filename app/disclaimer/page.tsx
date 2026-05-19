import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { LegalProse } from "@/components/layout/LegalProse";
import { Section } from "@/components/layout/Section";
import { pageMetadata } from "@/lib/page-metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description: `Disclaimer for ${site.name}'s portfolio website regarding content accuracy, external links, and professional advice.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <SiteLayout>
      <main>
        <Section className="pt-10 pb-0">
          <PageHero
            title="Disclaimer"
            description={`Last updated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
          />
        </Section>
        <Section className="pt-8">
          <LegalProse>
            <h2>General Information</h2>
            <p>
              The information on <strong>{site.url}</strong> is published by {site.name} for
              professional portfolio purposes. While we strive for accuracy, content may contain
              errors or become outdated. Use information at your own discretion.
            </p>

            <h2>Not Professional Advice</h2>
            <p>
              Blog posts, project descriptions, and technical articles are for educational and
              informational purposes only. They do not constitute legal, financial, or professional
              advice. Consult qualified professionals for decisions affecting your business or
              systems.
            </p>

            <h2>External Links</h2>
            <p>
              This Site may link to external websites (GitHub, LinkedIn, client demos, etc.). We are
              not responsible for the content, privacy practices, or availability of third-party
              sites.
            </p>

            <h2>Project Representations</h2>
            <p>
              Case studies and project listings describe work completed or contributed to by{" "}
              {site.name}. Specific outcomes may vary; past results do not guarantee future
              performance for similar projects.
            </p>

            <h2>Contact</h2>
            <p>
              For clarifications, contact <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </LegalProse>
        </Section>
      </main>
    </SiteLayout>
  );
}
