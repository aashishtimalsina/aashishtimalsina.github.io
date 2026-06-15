"use client";

import { useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Card, CardBody } from "@/components/ui/Card";
import { sendChatMessage, type ChatMessage } from "@/lib/api/chat";
import { cn } from "@/utils/cn";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<number | undefined>();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setError(null);
    setLoading(true);
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [
      ...m,
      {
        id: Date.now(),
        role: "user",
        content: userMsg,
        created_at: new Date().toISOString(),
      },
    ]);

    try {
      const data = await sendChatMessage(userMsg, sessionId);
      setSessionId(data.session_id);
      setMessages(data.messages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chat failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <main>
        <Section className="pt-10">
          <PageHero
            title="Ask about me"
            description="Portfolio assistant powered by AI. Questions about skills, projects, and how to work together."
          />
        </Section>
        <Section className="pt-0">
          <Container>
            <RequireAuth redirect="/chat">
              <Card className="mx-auto max-w-3xl">
                <CardBody className="flex min-h-[420px] flex-col gap-4">
                  <div className="flex-1 space-y-3 overflow-y-auto">
                    {messages.length === 0 ? (
                      <p className="text-sm text-fg-muted">
                        Try: &quot;What kind of systems do you build?&quot; or &quot;Can you deploy and maintain this after launch?&quot;
                      </p>
                    ) : (
                      messages.map((m) => (
                        <div
                          key={m.id}
                          className={cn(
                            "rounded-xl px-4 py-3 text-sm",
                            m.role === "user"
                              ? "ml-8 bg-white/10 text-fg"
                              : "mr-8 border border-border bg-bg/30 text-fg-muted",
                          )}
                        >
                          {m.content}
                        </div>
                      ))
                    )}
                    {loading ? (
                      <p className="text-sm text-fg-muted">Thinking…</p>
                    ) : null}
                  </div>
                  {error ? <p className="text-sm text-red-400">{error}</p> : null}
                  <form onSubmit={send} className="flex gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Your question…"
                      className="flex-1 rounded-xl border border-border bg-bg/40 px-4 py-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-2))]"
                    />
                    <button type="submit" disabled={loading} className={sendBtn}>
                      Send
                    </button>
                  </form>
                </CardBody>
              </Card>
            </RequireAuth>
          </Container>
        </Section>
      </main>
    </SiteLayout>
  );
}

const sendBtn = cn(
  "rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-50",
);
