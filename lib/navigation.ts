export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "AI Tools" },
  { href: "/chat", label: "Chat" },
  { href: "/contact", label: "Contact" },
] as const;

export const memberNav = [{ href: "/account", label: "Account" }] as const;

export const footerNav = {
  site: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Work" },
    { href: "/blog", label: "Blog" },
    { href: "/tools", label: "AI Tools" },
    { href: "/chat", label: "Chat" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/disclaimer", label: "Disclaimer" },
  ],
} as const;

/** Static routes for sitemap.xml — public, indexable pages only (auth-gated pages are noindexed). */
export const staticRoutes = [
  "/",
  "/about",
  "/services",
  "/blog",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
] as const;
