import { getSitemapData } from "@/lib/api/blog";
import { getSite } from "@/lib/get-site";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

/** llms.txt — a plain-text map of the site for AI crawlers and assistants. */
export async function GET() {
  const site = await getSite();
  let postLinks = "";
  try {
    const data = await getSitemapData();
    postLinks = data.posts
      .map((p) => `- ${absoluteUrl(`/blog/${p.slug}`)}`)
      .join("\n");
  } catch {
    // API offline — serve the static sections only
  }

  const body = `# ${site.name}

> ${site.headline}. ${site.summary}.

## Pages

- ${absoluteUrl("/")}: Home — overview and featured projects
- ${absoluteUrl("/about")}: About ${site.name}
- ${absoluteUrl("/services")}: Services and projects
- ${absoluteUrl("/blog")}: Blog — writing on building and deploying production software
- ${absoluteUrl("/contact")}: Contact

## Blog posts

${postLinks || `- ${absoluteUrl("/blog")}`}

## Feeds

- ${absoluteUrl("/feed.xml")}: RSS feed
- ${absoluteUrl("/sitemap.xml")}: Sitemap

## Contact

- Email: ${site.email}
- GitHub: ${site.github}
- LinkedIn: ${site.linkedin}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
