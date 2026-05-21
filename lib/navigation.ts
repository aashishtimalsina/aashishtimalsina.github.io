export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "AI Tools" },
  { href: "/chat", label: "Chat" },
  { href: "/contact", label: "Contact" },
] as const;

export const memberNav = [{ href: "/account", label: "Account" }] as const;

export const footerNav = {
  site: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Me" },
    { href: "/services", label: "Services & Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/disclaimer", label: "Disclaimer" },
  ],
} as const;

/** Static routes for sitemap.xml */
export const staticRoutes = [
  "/",
  "/about",
  "/services",
  "/blog",
  "/contact",
  "/tools",
  "/chat",
  "/account",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
] as const;
