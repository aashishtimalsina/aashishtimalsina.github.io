import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/page-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${site.name} for Laravel + Next.js projects, SaaS development, and consulting. Form, email, phone, GitHub, and LinkedIn.`,
  path: "/contact",
});

function ContactJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact — ${site.name}`,
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": "Person",
      name: site.name,
      email: site.email,
      telephone: site.phone,
      url: site.url,
      sameAs: [site.github, site.linkedin],
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export default function ContactPage() {
  return (
    <SiteLayout>
      <ContactJsonLd />
      <main>
        <Section className="pt-10">
          <PageHero
            title="Contact"
            description="Laravel API, Next.js frontend, or full SaaS build? Send a message — I reply within 1–2 business days."
          />
        </Section>

        <Section className="pt-0">
          <Container>
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="rounded-2xl border border-border bg-card/40 p-8 shadow-glow lg:col-span-3">
                <h2 className="text-lg font-semibold">Project inquiry</h2>
                <p className="mt-2 text-sm text-fg-muted">
                  Describe your stack, timeline, and goals. Messages are stored securely — see our{" "}
                  <a href="/privacy-policy" className="text-accent-1 underline">
                    Privacy Policy
                  </a>
                  .
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>

              <div className="grid gap-6 lg:col-span-2">
                <div className="rounded-2xl border border-border bg-card/40 p-6 shadow-glow">
                  <h2 className="text-lg font-semibold">Email</h2>
                  <p className="mt-3 text-sm text-fg-muted">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-fg underline decoration-border hover:decoration-fg"
                    >
                      {site.email}
                    </a>
                  </p>
                  <Button href={`mailto:${site.email}`} variant="secondary" className="mt-4">
                    Email directly
                  </Button>
                </div>

                <div className="rounded-2xl border border-border bg-card/40 p-6 shadow-glow">
                  <h2 className="text-lg font-semibold">Phone</h2>
                  <p className="mt-3 text-sm text-fg-muted">
                    <a
                      href={`tel:${site.phone}`}
                      className="text-fg underline decoration-border hover:decoration-fg"
                    >
                      {site.phone}
                    </a>
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card/40 p-6 shadow-glow">
                  <h2 className="text-lg font-semibold">Social</h2>
                  <ul className="mt-3 space-y-2 text-sm text-fg-muted">
                    <li>
                      <a
                        href={site.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-fg underline decoration-border hover:decoration-fg"
                      >
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a
                        href={site.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-fg underline decoration-border hover:decoration-fg"
                      >
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </SiteLayout>
  );
}
