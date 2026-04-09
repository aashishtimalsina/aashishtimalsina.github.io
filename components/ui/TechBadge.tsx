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
        "inline-flex items-center rounded-full border border-border bg-bg/30 px-3 py-1 text-xs text-fg-muted backdrop-blur",
        className
      )}
    >
      {children}
    </span>
  );
}

