import { NextResponse } from "next/server";

function backendApiBase(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (fromEnv && fromEnv !== "undefined") {
    return fromEnv.replace(/\/$/, "");
  }
  return "https://admin.aashishtimalsina.com.np/api/v1";
}

/** Same-origin proxy so Google sign-in is not blocked by cross-origin CORS. */
export async function GET(request: Request) {
  const redirect = new URL(request.url).searchParams.get("redirect") ?? "/account";
  const target = `${backendApiBase()}/auth/google/url?redirect=${encodeURIComponent(redirect)}`;

  try {
    const res = await fetch(target, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      const message =
        (body as { message?: string }).message ??
        `Backend error (${res.status}). Check admin API logs and run composer install on the server.`;
      return NextResponse.json({ message }, { status: res.status });
    }

    return NextResponse.json(body);
  } catch {
    return NextResponse.json(
      { message: "Could not reach the API. Check NEXT_PUBLIC_API_URL and backend availability." },
      { status: 502 },
    );
  }
}
