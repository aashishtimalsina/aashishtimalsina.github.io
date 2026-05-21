"use client";

import { useState } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Card, CardBody } from "@/components/ui/Card";
import { humanizeText, summarizeText } from "@/lib/api/tools";
import { cn } from "@/utils/cn";

export default function ToolsPage() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState<"summarize" | "humanize" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(tool: "summarize" | "humanize") {
    setError(null);
    setLoading(tool);
    try {
      const result =
        tool === "summarize" ? await summarizeText(text) : await humanizeText(text);
      setOutput(result.output);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(null);
    }
  }

  return (
    <SiteLayout>
      <main>
        <Section className="pt-10">
          <PageHero
            title="AI writing tools"
            description="Summarize or humanize text. Sign in with Google; your history is saved on the server."
          />
        </Section>
        <Section className="pt-0">
          <Container>
            <RequireAuth redirect="/tools">
              <div className="mx-auto grid max-w-4xl gap-6">
                <Card>
                  <CardBody className="space-y-4">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={10}
                      placeholder="Paste at least 20 characters…"
                      className="w-full rounded-xl border border-border bg-bg/40 p-4 text-sm text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-2))]"
                    />
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        disabled={loading !== null || text.length < 20}
                        onClick={() => run("summarize")}
                        className={btnClass}
                      >
                        {loading === "summarize" ? "Working…" : "Summarize"}
                      </button>
                      <button
                        type="button"
                        disabled={loading !== null || text.length < 20}
                        onClick={() => run("humanize")}
                        className={btnClass}
                      >
                        {loading === "humanize" ? "Working…" : "Humanize"}
                      </button>
                    </div>
                    {error ? <p className="text-sm text-red-400">{error}</p> : null}
                  </CardBody>
                </Card>
                {output ? (
                  <Card>
                    <CardBody>
                      <h2 className="mb-3 text-sm font-semibold text-fg">Result</h2>
                      <div className="prose prose-invert max-w-none whitespace-pre-wrap text-sm text-fg-muted">
                        {output}
                      </div>
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

const btnClass = cn(
  "rounded-xl border border-border bg-white/10 px-5 py-2.5 text-sm font-medium text-fg transition hover:bg-white/15",
  "disabled:opacity-50",
);
