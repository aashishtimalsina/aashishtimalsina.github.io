import { cn } from "@/utils/cn";

export function TechBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-xs text-fg-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

