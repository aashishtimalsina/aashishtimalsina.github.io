import { Container } from "@/components/layout/Container";

type Props = {
  title: string;
  description?: string;
};

export function PageHero({ title, description }: Props) {
  return (
    <Container>
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-3 text-base leading-relaxed text-fg-muted sm:mt-4 sm:text-lg">
            {description}
          </p>
        ) : null}
      </header>
    </Container>
  );
}
