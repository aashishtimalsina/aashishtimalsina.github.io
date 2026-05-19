import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { LegalProse } from "@/components/layout/LegalProse";
import { Section } from "@/components/layout/Section";
import { pageMetadata } from "@/lib/page-metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `Privacy Policy for ${site.name}'s portfolio website. How we collect, use, and protect your personal information.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <SiteLayout>
      <main>
        <Section className="pt-10 pb-0">
          <PageHero
            title="Privacy Policy"
            description={`Last updated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
          />
        </Section>
        <Section className="pt-8">
          <LegalProse>
            <p>
              This Privacy Policy explains how <strong>{site.name}</strong> (&quot;we&quot;,
              &quot;us&quot;, or &quot;I&quot;) collects, uses, and protects information when you
              visit <strong>{site.url}</strong> (the &quot;Site&quot;).
            </p>

            <h2>Information We Collect</h2>
            <ul>
              <li>
                <strong>Contact information</strong> — If you email or message us, we receive your
                name, email address, and message content.
              </li>
              <li>
                <strong>Usage data</strong> — We may use analytics tools (e.g. Google Analytics) to
                collect anonymized data such as pages visited, browser type, and general location.
              </li>
              <li>
                <strong>Cookies</strong> — The Site may use cookies for analytics and functionality.
                You can disable cookies in your browser settings.
              </li>
            </ul>

            <h2>How We Use Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Respond to inquiries and project requests</li>
              <li>Improve the Site and user experience</li>
              <li>Monitor security and prevent abuse</li>
            </ul>

            <h2>Contact Form</h2>
            <p>
              When you submit the <a href="/contact">contact form</a>, we collect your name, email,
              optional subject, and message. Data is stored on our Laravel backend to respond to your
              inquiry. We do not use this data for marketing without your consent.
            </p>

            <h2>Analytics (Google Analytics)</h2>
            <p>
              If enabled, we use Google Analytics 4 to collect anonymized usage data (pages visited,
              device type, approximate location). You can opt out via browser extensions or disable
              cookies in your browser settings. See{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </p>

            <h2>Third-Party Services</h2>
            <p>
              The Site may link to third-party services (GitHub, LinkedIn, Google Analytics, hosting
              providers). Their privacy policies apply when you interact with those services. We do
              not sell your personal data to third parties.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain contact correspondence only as long as needed to respond to your inquiry or
              fulfill a business relationship, unless a longer period is required by law.
            </p>

            <h2>Your Rights</h2>
            <p>
              You may request access, correction, or deletion of your personal data by contacting us
              at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <h2>Contact</h2>
            <p>
              For privacy-related questions, contact{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </LegalProse>
        </Section>
      </main>
    </SiteLayout>
  );
}
