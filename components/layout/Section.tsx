import { cn } from "@/utils/cn";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-10 sm:py-14", className)}>
      {children}
    </section>
  );
}

