import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { LegalProse } from "@/components/layout/LegalProse";
import { Section } from "@/components/layout/Section";
import { pageMetadata } from "@/lib/page-metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `Terms and Conditions for using ${site.name}'s portfolio website and services.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <SiteLayout>
      <main>
        <Section className="pt-10 pb-0">
          <PageHero
            title="Terms & Conditions"
            description={`Last updated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
          />
        </Section>
        <Section className="pt-8">
          <LegalProse>
            <p>
              By accessing <strong>{site.url}</strong>, you agree to these Terms &amp; Conditions.
              If you do not agree, please do not use the Site.
            </p>

            <h2>Use of the Website</h2>
            <p>
              Content on this Site is provided for general information about {site.name}&apos;s
              professional services. You may not copy, reproduce, or redistribute content without
              written permission, except for personal, non-commercial reference with attribution.
            </p>

            <h2>Professional Services</h2>
            <p>
              Any development work, consulting, or contracts are governed by separate written
              agreements between you and {site.name}. Nothing on this Site constitutes a binding
              offer or guarantee of availability.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              Unless otherwise stated, all text, design, and code displayed on this Site are the
              intellectual property of {site.name}. Project names and third-party trademarks belong
              to their respective owners.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              The Site is provided &quot;as is&quot; without warranties. {site.name} is not liable
              for any damages arising from use of the Site, linked external resources, or reliance on
              published content.
            </p>

            <h2>Changes</h2>
            <p>
              We may update these terms at any time. Continued use of the Site after changes
              constitutes acceptance of the revised terms.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </LegalProse>
        </Section>
      </main>
    </SiteLayout>
  );
}
