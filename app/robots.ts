import type { MetadataRoute } from "next";
import { site, absoluteUrl } from "@/lib/site";

const BLOCKED_PATHS = ["/api/", "/og/", "/preview.png", "/auth/"];

/** AI crawlers explicitly allowed to read public content (search + assistants). */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Amazonbot",
  "Applebot",
  "Applebot-Extended",
  "meta-externalagent",
  "DuckAssistBot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: BLOCKED_PATHS,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: BLOCKED_PATHS,
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
