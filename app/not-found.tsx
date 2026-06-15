import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-4 sm:px-6">
      <div className="rounded-xl border border-border p-6 sm:p-8">
        <div className="text-sm text-fg-muted">404</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          This page could not be found.
        </h1>
        <p className="mt-3 text-sm text-fg-muted sm:text-base">
          If you followed a link, it may have moved during the rebuild.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
