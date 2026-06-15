import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../styles/globals.css";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { SiteProvider } from "@/components/providers/SiteProvider";
import { getSite } from "@/lib/get-site";
import { absoluteUrl } from "@/lib/site";
import { seo } from "@/lib/seo";
import { buildMetadata, siteVerification } from "@/lib/seo/metadata";
import { rootGraphSchema } from "@/lib/seo/schema";
import { cn } from "@/utils/cn";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const title = site.seo?.title ?? seo.title;
  const description = site.seo?.description ?? seo.description;
  const keywords = site.seo?.keywords?.length ? site.seo.keywords : [...seo.keywords];
  const ogImage = site.og_image ?? "/og";

  const baseMeta = buildMetadata({
    title,
    description,
    path: "/",
    keywords,
    ogImage,
  });

  return {
    ...baseMeta,
    title: {
      default: title,
      template: `%s — ${site.name}`,
    },
    verification: siteVerification(site.analytics?.google_site_verification),
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": absoluteUrl("/feed.xml", site.url),
      },
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  const gaId =
    site.analytics?.ga_measurement_id ?? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? null;

  return (
    <html lang="en" className={cn("dark", fontSans.variable, fontMono.variable)}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${site.name} Blog RSS`}
          href="/feed.xml"
        />
        <GoogleAnalytics measurementId={gaId} />
      </head>
      <body className="min-h-dvh bg-bg font-sans text-fg">
        <SiteProvider site={site}>
          <AuthProvider>
            <JsonLd data={rootGraphSchema(site)} />
            {children}
          </AuthProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
