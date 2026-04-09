import Link from "next/link";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-black hover:opacity-90 shadow-[0_10px_30px_rgba(255,255,255,0.08)]",
  secondary: "border border-border bg-bg/30 text-fg hover:bg-bg/50",
  ghost: "text-fg-muted hover:text-fg hover:bg-white/5",
};

export function Button({
  href,
  children,
  className,
  variant = "secondary",
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  target?: string;
  rel?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent-2))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--bg))]",
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}

