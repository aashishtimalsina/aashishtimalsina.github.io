export type Project = {
  slug: string;
  title: string;
  description: string;
  highlights: string[];
  stack: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "multitenant-api-platform",
    title: "Multi-tenant API Platform",
    description:
      "A production-ready REST API platform with org/workspace isolation, JWT auth, rate limiting, and audit trails.",
    highlights: ["JWT + RBAC", "Rate limits", "Audit logs", "OpenAPI docs"],
    stack: ["Laravel", "PostgreSQL", "Redis", "Nginx", "Docker"],
    githubUrl: "https://github.com/aashishtimalsina",
    liveUrl: "https://github.com/aashishtimalsina",
    featured: true,
  },
  {
    slug: "realtime-ops-console",
    title: "Real-time Ops Console",
    description:
      "Socket-based dashboard for streaming metrics and events, built for low-latency observability and incident response.",
    highlights: ["WebSockets", "Event streaming", "Role-based access"],
    stack: ["Node.js", "WebSockets", "Docker", "CI/CD", "DigitalOcean"],
    githubUrl: "https://github.com/aashishtimalsina",
    liveUrl: "https://github.com/aashishtimalsina",
    featured: true,
  },
  {
    slug: "mobile-backend-suite",
    title: "Mobile Backend Suite",
    description:
      "Backend APIs for Flutter apps: auth, file uploads, push tokens, and third-party integrations with robust observability.",
    highlights: ["Mobile API integration", "Uploads", "Background jobs"],
    stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "GitHub Actions"],
    githubUrl: "https://github.com/aashishtimalsina",
    liveUrl: "https://github.com/aashishtimalsina",
  },
  {
    slug: "deployment-automation",
    title: "Deployment Automation Toolkit",
    description:
      "CI/CD pipelines and server automation for Ubuntu + Nginx + Docker with repeatable deployments and rollbacks.",
    highlights: ["GitHub Actions", "Zero-downtime deploys", "Rollback strategy"],
    stack: ["GitHub Actions", "Ubuntu", "Nginx", "Docker", "Bash"],
    githubUrl: "https://github.com/aashishtimalsina",
    liveUrl: "https://github.com/aashishtimalsina",
  },
];

