import { cn } from "@/utils/cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-card/40 shadow-glow",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[rgba(124,58,237,0.20)] blur-2xl" />
        <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-[rgba(14,165,233,0.16)] blur-3xl" />
      </div>
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("relative p-8", className)}>{children}</div>;
}

