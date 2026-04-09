import { cn } from "@/utils/cn";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 2xl:max-w-[1600px]",
        className
      )}
    >
      {children}
    </div>
  );
}

