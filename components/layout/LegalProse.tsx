import { Container } from "@/components/layout/Container";
import { cn } from "@/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function LegalProse({ children, className }: Props) {
  return (
    <Container>
      <article
        className={cn(
          "prose prose-invert prose-lg max-w-3xl prose-headings:tracking-tight prose-a:text-accent-1",
          className,
        )}
      >
        {children}
      </article>
    </Container>
  );
}
