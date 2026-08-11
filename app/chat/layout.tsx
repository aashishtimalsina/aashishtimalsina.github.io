import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
  robots: { index: false, follow: true },
  alternates: { canonical: "/chat" },
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
