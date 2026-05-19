import { productStack } from "@/lib/stack";
import { TechBadge } from "@/components/ui/TechBadge";

export function ProductStack({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {productStack.map((item) => (
          <TechBadge key={item.id}>{item.short}</TechBadge>
        ))}
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {productStack.map((item) => (
        <li
          key={item.id}
          className="rounded-2xl border border-border bg-bg/20 p-4"
        >
          <div className="text-sm font-medium text-fg">{item.label}</div>
          <p className="mt-2 text-sm text-fg-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
