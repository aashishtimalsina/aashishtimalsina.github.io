export type SiteConfig = {
  name: string;
  role: string;
  headline: string;
  summary: string;
  niche: string;
  email: string;
  phone: string;
  url: string;
  github: string;
  linkedin: string;
  twitter?: string | null;
  locale: string;
  avatar?: string | null;
  logo?: string | null;
  og_image?: string | null;
  hero_image?: string | null;
  projects_heading?: string | null;
  projects_subheading?: string | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    keywords?: string[];
  };
  analytics?: {
    ga_measurement_id?: string | null;
    google_site_verification?: string | null;
  };
};

export const defaultSite: SiteConfig = {
  name: "Aashish Timalsina",
  role: "Laravel & SaaS Engineer",
  headline: "I build production Laravel systems — APIs, multi-tenant SaaS, and real deployments",
  summary: "5+ years shipping Laravel APIs, SaaS products, and DevOps pipelines from Nepal",
  niche: "Laravel + SaaS production systems",
  email: "tm.aashish1@gmail.com",
  phone: "9848077880",
  github: "https://github.com/aashishtimalsina",
  linkedin: "https://www.linkedin.com/in/aashishtimalsina/",
  url: "https://aashishtimalsina.com.np",
  locale: "en_NP",
  projects_heading: "Featured projects",
  projects_subheading:
    "Real-world systems across APIs, deployments, and realtime services—built with a production mindset.",
};
