"use client";

import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { useAuth } from "@/components/providers/AuthProvider";
import { Card, CardBody } from "@/components/ui/Card";

export function RequireAuth({
  children,
  redirect,
}: {
  children: React.ReactNode;
  redirect?: string;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Card>
        <CardBody>
          <p className="text-fg-muted">Loading…</p>
        </CardBody>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardBody className="flex flex-col items-start gap-4">
          <p className="text-fg-muted">Sign in with Google to use this feature.</p>
          <GoogleSignInButton redirect={redirect} />
        </CardBody>
      </Card>
    );
  }

  return <>{children}</>;
}
