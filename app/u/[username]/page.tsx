"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Card, CardBody } from "@/components/ui/Card";
import { fetchPublicProfile, type AuthUser } from "@/lib/api/auth";

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPublicProfile(username)
      .then(setUser)
      .catch(() => setError("Profile not found or is private."));
  }, [username]);

  return (
    <SiteLayout>
      <main>
        <Section className="pt-16">
          <Container>
            {error ? (
              <p className="text-fg-muted">{error}</p>
            ) : user ? (
              <Card className="mx-auto max-w-lg">
                <CardBody className="flex flex-col items-center gap-4 text-center">
                  {user.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.avatar}
                      alt=""
                      className="h-20 w-20 rounded-full border border-border"
                    />
                  ) : null}
                  <h1 className="text-2xl font-semibold text-fg">
                    {user.profile?.display_name ?? user.name}
                  </h1>
                  {user.profile?.username ? (
                    <p className="text-sm text-fg-muted">@{user.profile.username}</p>
                  ) : null}
                  {user.profile?.bio ? (
                    <p className="text-sm text-fg-muted">{user.profile.bio}</p>
                  ) : null}
                  {user.profile?.website ? (
                    <a
                      href={user.profile.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-accent-1 hover:underline"
                    >
                      {user.profile.website}
                    </a>
                  ) : null}
                </CardBody>
              </Card>
            ) : (
              <p className="text-fg-muted">Loading…</p>
            )}
          </Container>
        </Section>
      </main>
    </SiteLayout>
  );
}
