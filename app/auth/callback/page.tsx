"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setAuthToken } from "@/lib/api/client";
import { useAuth } from "@/components/providers/AuthProvider";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function AuthCallbackPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { refresh } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = params.get("token");
    const redirect = params.get("redirect") || "/account";

    if (!token) {
      setError("Missing login token. Try signing in again.");
      return;
    }

    setAuthToken(token);
    refresh()
      .then(() => router.replace(redirect))
      .catch(() => setError("Could not complete sign in."));
  }, [params, router, refresh]);

  return (
    <SiteLayout>
      <main>
        <Section className="pt-16">
          <Container>
            <p className="text-fg-muted">{error ?? "Signing you in…"}</p>
          </Container>
        </Section>
      </main>
    </SiteLayout>
  );
}
