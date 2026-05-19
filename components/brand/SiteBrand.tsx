import { cn } from "@/utils/cn";

type Props = {
  name: string;
  role?: string;
  className?: string;
  showRole?: boolean;
};

/** Text-only site brand (no next/image — avoids Turbopack HMR issues). */
export function SiteBrand({ name, role, className, showRole = false }: Props) {
  return (
    <span className={cn("inline-flex flex-col", className)}>
      <span className="text-lg font-semibold tracking-tight text-fg sm:text-xl">{name}</span>
      {showRole && role ? (
        <span className="mt-0.5 text-sm text-fg-muted">{role}</span>
      ) : null}
    </span>
  );
}
