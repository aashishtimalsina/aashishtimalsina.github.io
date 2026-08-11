import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools",
  robots: { index: false, follow: true },
  alternates: { canonical: "/tools" },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
