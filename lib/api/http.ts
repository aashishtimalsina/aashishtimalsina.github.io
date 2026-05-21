/**
 * Single module for client-side API calls (avoids Turbopack HMR breaking split barrels).
 * Server modules (blog, settings) may import { API_URL } from here too.
 */

export function getApiBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (fromEnv && fromEnv !== "undefined") {
    return fromEnv.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8000/api/v1";
  }

  return "https://admin.aashishtimalsina.com.np/api/v1";
}

export const API_URL = getApiBaseUrl();

const TOKEN_KEY = "portfolio_auth_token";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {},
): Promise<T> {
  const base = getApiBaseUrl();
  if (!base || base.includes("undefined")) {
    throw new Error(
      "API URL is not configured. Set NEXT_PUBLIC_API_URL in frontend/.env and restart npm run dev.",
    );
  }

  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth !== false) {
    const token = getAuthToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const res = await fetch(`${base}${path}`, {
    ...options,
    headers,
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      (json as { message?: string }).message ??
      (json as { error?: string }).error ??
      `Request failed (${res.status})`;
    throw new Error(message);
  }

  return json as T;
}
