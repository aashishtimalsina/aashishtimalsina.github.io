import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage,
}: PageMetaInput): Metadata {
  return buildMetadata({ title, description, path, keywords, ogImage });
}
