import { Suspense } from "react";

export default function AuthCallbackLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="p-8 text-fg-muted">Signing you in…</div>}>{children}</Suspense>;
}
