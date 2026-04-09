import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../styles/globals.css";
import { site, absoluteUrl } from "@/lib/site";
import { seo } from "@/lib/seo";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title,
    template: `%s — ${site.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  category: "Technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: seo.title,
    description: seo.description,
    siteName: site.name,
    locale: site.locale,
    images: [{ url: absoluteUrl("/og"), width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [absoluteUrl("/og")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Full Stack Developer & API Engineer",
    url: site.url,
    sameAs: [site.github],
    email: site.email,
    knowsAbout: [
      "Backend API Development",
      "Laravel",
      "Python",
      "Node.js",
      "Microservices",
      "Docker",
      "Nginx",
      "DigitalOcean",
      "CI/CD",
      "GitHub Actions",
      "WebSockets",
      "Flutter backend APIs",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seo.title,
    url: site.url,
    inLanguage: "en",
    author: { "@type": "Person", name: site.name },
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seo.title,
    url: site.url,
    description: seo.description,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", url: site.url, name: seo.title },
    about: { "@type": "Person", name: site.name },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([person, website, webpage]),
      }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("dark", fontSans.variable, fontMono.variable)}>
      <body
        className={cn(
          "min-h-dvh bg-bg font-sans text-fg",
          "selection:bg-[rgba(99,102,241,0.25)] selection:text-fg"
        )}
      >
        <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-fade" />
        <div className="pointer-events-none fixed inset-0 -z-10 opacity-35 noise" />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}

