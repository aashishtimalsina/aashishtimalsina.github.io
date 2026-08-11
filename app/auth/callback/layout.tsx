import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthCallbackLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="p-8 text-fg-muted">Signing you in…</div>}>{children}</Suspense>;
}
