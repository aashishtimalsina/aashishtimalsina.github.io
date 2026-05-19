import { Container } from "@/components/layout/Container";

type Props = {
  title: string;
  description?: string;
};

export function PageHero({ title, description }: Props) {
  return (
    <Container>
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {description ? <p className="mt-4 text-lg text-fg-muted">{description}</p> : null}
      </header>
    </Container>
  );
}
