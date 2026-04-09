import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6">
      <div className="rounded-3xl border border-border bg-card/40 p-10 shadow-glow">
        <div className="text-sm text-fg-muted">404</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">This page could not be found.</h1>
        <p className="mt-4 text-fg-muted">
          If you followed a link, it may have moved during the rebuild.
        </p>
        <div className="mt-7">
          <Link
            href="/"
            className="inline-flex rounded-xl bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}

