import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";

const DEFAULT_OG_IMAGE = "/og";

export type BuildMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  ogImage,
  ogType = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = ogImage?.startsWith("http") ? ogImage : absoluteUrl(ogImage ?? DEFAULT_OG_IMAGE);
  const fullTitle = path === "/" ? title : title;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    metadataBase: new URL(site.url),
    alternates: { canonical },
    openGraph: {
      type: ogType,
      url: canonical,
      title: `${title} — ${site.name}`,
      description,
      siteName: site.name,
      locale: site.locale,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
      images: [imageUrl],
      creator: "@aashishtimalsina",
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
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
}

export function siteVerification(googleCode?: string | null): Metadata["verification"] {
  const google = googleCode ?? process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  if (!google) return undefined;
  return { google };
}
