import { Card, CardBody } from "@/components/ui/Card";
import { TechBadge } from "@/components/ui/TechBadge";

const radar = [
  { label: "Using now", items: ["Next.js", "Laravel APIs", "Docker", "Nginx", "GitHub Actions"] },
  { label: "Exploring", items: ["Event-driven systems", "WebSockets scaling", "Observability (OTel)"] },
] as const;

const metrics = [
  { label: "Deployments", value: "128" },
  { label: "Uptime", value: "99.98%" },
  { label: "CI/CD runs", value: "412" },
  { label: "Builds", value: "1,024" },
] as const;

export function DashboardCard() {
  return (
    <Card className="h-full">
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-fg-muted">Developer dashboard</div>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">Signals & radar</h3>
            <p className="mt-2 text-sm text-fg-muted">
              A quick view of the systems mindset: shipping, uptime, and what’s being explored next.
            </p>
          </div>
          <TechBadge>interactive</TechBadge>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-border bg-bg/20 p-4">
              <div className="text-xs text-fg-muted">{m.label}</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">{m.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4">
          {radar.map((r) => (
            <div key={r.label} className="rounded-2xl border border-border bg-bg/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-fg">{r.label}</div>
                <TechBadge>{r.items.length} items</TechBadge>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {r.items.map((i) => (
                  <TechBadge key={i}>{i}</TechBadge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

