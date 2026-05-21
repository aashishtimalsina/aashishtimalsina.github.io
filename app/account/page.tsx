"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { useAuth } from "@/components/providers/AuthProvider";
import { Card, CardBody } from "@/components/ui/Card";
import { fetchHistory, updateProfile } from "@/lib/api/auth";
import { cn } from "@/utils/cn";

export default function AccountPage() {
  const { user, logout, refresh } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<Awaited<ReturnType<typeof fetchHistory>> | null>(null);

  useEffect(() => {
    if (user?.profile) {
      setDisplayName(user.profile.display_name ?? user.name);
      setUsername(user.profile.username ?? "");
      setBio(user.profile.bio ?? "");
      setWebsite(user.profile.website ?? "");
      setIsPublic(user.profile.is_public ?? true);
    }
  }, [user]);

  useEffect(() => {
    fetchHistory().then(setHistory).catch(() => setHistory(null));
  }, [user]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await updateProfile({
        display_name: displayName,
        username: username || undefined,
        bio,
        website: website || undefined,
        is_public: isPublic,
      });
      await refresh();
      setMessage("Profile saved.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SiteLayout>
      <main>
        <Section className="pt-10">
          <PageHero title="Your account" description="Profile, public page, and AI tool history." />
        </Section>
        <Section className="pt-0">
          <Container>
            <RequireAuth redirect="/account">
              <div className="mx-auto grid max-w-3xl gap-6">
                {user ? (
                  <Card>
                    <CardBody className="flex items-center gap-4">
                      {user.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.avatar}
                          alt=""
                          className="h-14 w-14 rounded-full border border-border"
                        />
                      ) : null}
                      <div className="flex-1">
                        <p className="font-semibold text-fg">{user.name}</p>
                        {user.email ? (
                          <p className="text-sm text-fg-muted">{user.email}</p>
                        ) : null}
                        {username && isPublic ? (
                          <Link
                            href={`/u/${username}`}
                            className="text-sm text-accent-1 hover:underline"
                          >
                            Public profile →
                          </Link>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={() => logout()}
                        className="text-sm text-fg-muted hover:text-fg"
                      >
                        Sign out
                      </button>
                    </CardBody>
                  </Card>
                ) : (
                  <GoogleSignInButton redirect="/account" />
                )}

                <Card>
                  <CardBody>
                    <form onSubmit={saveProfile} className="space-y-4">
                      <h2 className="text-sm font-semibold text-fg">Profile</h2>
                      <Field label="Display name" value={displayName} onChange={setDisplayName} />
                      <Field label="Username" value={username} onChange={setUsername} />
                      <Field label="Bio" value={bio} onChange={setBio} multiline />
                      <Field label="Website" value={website} onChange={setWebsite} />
                      <label className="flex items-center gap-2 text-sm text-fg-muted">
                        <input
                          type="checkbox"
                          checked={isPublic}
                          onChange={(e) => setIsPublic(e.target.checked)}
                        />
                        Public profile visible at /u/username
                      </label>
                      <button type="submit" disabled={saving} className={saveBtn}>
                        {saving ? "Saving…" : "Save profile"}
                      </button>
                      {message ? <p className="text-sm text-fg-muted">{message}</p> : null}
                    </form>
                  </CardBody>
                </Card>

                {history ? (
                  <Card>
                    <CardBody className="space-y-4">
                      <h2 className="text-sm font-semibold text-fg">Recent AI usage</h2>
                      <ul className="space-y-2 text-sm text-fg-muted">
                        {history.tools.slice(0, 5).map((t) => (
                          <li key={t.id}>
                            {t.tool} — {new Date(t.created_at).toLocaleDateString()}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-fg-muted">
                        {history.chat_sessions.length} chat session(s)
                      </p>
                    </CardBody>
                  </Card>
                ) : null}
              </div>
            </RequireAuth>
          </Container>
        </Section>
      </main>
    </SiteLayout>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const className =
    "w-full rounded-xl border border-border bg-bg/40 px-4 py-2.5 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-2))]";
  return (
    <label className="block space-y-1">
      <span className="text-xs text-fg-muted">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={className} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={className} />
      )}
    </label>
  );
}

const saveBtn = cn(
  "rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black hover:opacity-90 disabled:opacity-50",
);
