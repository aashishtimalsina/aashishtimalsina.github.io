import Link from "next/link";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-fg text-bg hover:opacity-90",
  secondary: "border border-border text-fg hover:bg-white/5",
  ghost: "text-fg-muted hover:text-fg",
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
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
