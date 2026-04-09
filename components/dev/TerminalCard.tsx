"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardBody } from "@/components/ui/Card";
import { cn } from "@/utils/cn";

type Line = { prompt?: string; text: string; dim?: boolean };

const PROMPT = "aashish@portfolio:~$";

function linesFrom(text: string, { dim = false }: { dim?: boolean } = {}): Line[] {
  return text
    .split("\n")
    .filter((l) => l.length > 0)
    .map((l) => ({ text: l, dim }));
}

function run(cmdRaw: string): { out: Line[]; clear?: boolean } {
  const cmd = cmdRaw.trim();
  if (!cmd) return { out: [] };

  const [base, ...rest] = cmd.split(/\s+/);
  const arg = rest.join(" ");

  switch (base) {
    case "help":
      return {
        out: [
          { dim: true, text: "Available commands:" },
          ...linesFrom(
            "ls\nwhoami\nskills\ngit status\ndocker build\ndeploy\nclear\nhelp",
            { dim: false }
          ),
        ],
      };
    case "ls":
      return {
        out: linesFrom(
          "about.md\nprojects/\nservices/\ninfra/\nREADME.md\n.github/workflows/\ndocker-compose.yml"
        ),
      };
    case "whoami":
      return { out: [{ text: "Aashish Timalsina — Full Stack Developer & API Engineer" }] };
    case "skills":
      return {
        out: [
          { dim: true, text: "Backend:" },
          ...linesFrom("Laravel • Python • Node.js • REST • Auth • Microservices"),
          { dim: true, text: "DevOps:" },
          ...linesFrom("DigitalOcean • Ubuntu • Nginx • Docker • CI/CD • GitHub Actions"),
          { dim: true, text: "Realtime:" },
          ...linesFrom("WebSockets • Streaming • Socket apps"),
        ],
      };
    case "git":
      if (arg === "status") {
        return {
          out: linesFrom(
            "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean",
            { dim: true }
          ),
        };
      }
      return { out: [{ dim: true, text: "git: supported: git status" }] };
    case "docker":
      if (arg === "build") {
        return {
          out: [
            { dim: true, text: "Step 1/7 : FROM node:20-alpine" },
            { dim: true, text: "Step 2/7 : WORKDIR /app" },
            { dim: true, text: "Step 3/7 : COPY . ." },
            { dim: true, text: "Step 4/7 : RUN npm ci" },
            { dim: true, text: "Step 5/7 : RUN npm run build" },
            { dim: true, text: "exporting layers… done" },
            { text: "✅ image built: portfolio:latest" },
          ],
        };
      }
      return { out: [{ dim: true, text: "docker: supported: docker build" }] };
    case "deploy":
      return {
        out: [
          { dim: true, text: "target: digitalocean / ubuntu / nginx" },
          { dim: true, text: "running pipeline… (build → test → push → deploy)" },
          { text: "✅ deploy complete (zero-downtime)" },
        ],
      };
    case "clear":
      return { out: [], clear: true };
    default:
      return { out: [{ dim: true, text: `command not found: ${base}` }, { dim: true, text: "type help" }] };
  }
}

export function TerminalCard({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [buffer, setBuffer] = useState<Line[]>([
    { dim: true, text: "Type `help` then try: ls, skills, deploy" },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [buffer]);

  const prompt = useMemo(() => (compact ? "$" : PROMPT), [compact]);

  return (
    <div className={cn("group", className)}>
      <Card className="h-full">
        <CardBody className="p-0">
          <div
            className={cn(
              "flex items-center justify-between border-b border-border",
              compact ? "px-4 py-2" : "px-5 py-3"
            )}
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--bad))]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--warn))]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--ok))]" />
            </div>
            {compact ? null : <div className="text-xs text-fg-muted">terminal</div>}
          </div>

          <div
            className={cn(
              "relative overflow-hidden",
              compact ? "px-4 py-3" : "px-5 py-4"
            )}
          >
            <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
              <div className="h-full w-full bg-[linear-gradient(90deg,rgba(124,58,237,0.22),rgba(14,165,233,0.14),transparent)]" />
            </div>

            <div
              className={cn(
                "relative font-mono",
                compact ? "text-[11px] leading-5" : "text-[13px] leading-6"
              )}
            >
              <div ref={scrollRef} className={cn("max-h-56 overflow-auto pr-1", !compact && "max-h-64")}>
                {buffer.map((l, idx) => (
                  <div key={idx} className={cn("text-fg", l.dim && "text-fg-muted")}>
                    {l.prompt ? (
                      <span className="text-[hsl(var(--accent-2))]">{l.prompt} </span>
                    ) : null}
                    <span>{l.text}</span>
                  </div>
                ))}
              </div>

              <form
                className="mt-2 flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const cmd = input.trim();
                  if (!cmd) return;

                  const result = run(cmd);
                  setBuffer((b) => {
                    const next = result.clear ? [] : [...b];
                    next.push({ prompt, text: cmd, dim: false });
                    next.push(...result.out);
                    return next.slice(-80);
                  });
                  setHistory((h) => [...h, cmd].slice(-30));
                  setCursor(null);
                  setInput("");
                }}
              >
                <span className="text-[hsl(var(--accent-2))]">{prompt}</span>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (history.length === 0) return;
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setCursor((c) => {
                        const next = c === null ? history.length - 1 : Math.max(0, c - 1);
                        setInput(history[next] ?? "");
                        return next;
                      });
                    }
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setCursor((c) => {
                        if (c === null) return null;
                        const next = Math.min(history.length, c + 1);
                        if (next >= history.length) {
                          setInput("");
                          return null;
                        }
                        setInput(history[next] ?? "");
                        return next;
                      });
                    }
                  }}
                  spellCheck={false}
                  autoCapitalize="none"
                  autoCorrect="off"
                  className={cn(
                    "w-full bg-transparent text-fg outline-none placeholder:text-fg-muted/60",
                    compact ? "text-[11px]" : "text-[13px]"
                  )}
                  placeholder={compact ? "help" : "help | ls | skills | deploy"}
                  aria-label="Terminal command input"
                />
              </form>

              <div className="mt-1 flex items-center gap-2">
                <span className="inline-block h-3 w-2 rounded-sm bg-white/80" />
                {compact ? null : <span className="text-xs text-fg-muted">interactive</span>}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

