import { apiFetch } from "./client";

export type UserProfile = {
  username: string | null;
  display_name: string | null;
  bio: string | null;
  website: string | null;
  is_public: boolean;
};

export type AuthUser = {
  id: number;
  name: string;
  email?: string;
  avatar: string | null;
  role: string;
  profile?: UserProfile;
};

export async function getGoogleAuthUrl(redirect = "/account"): Promise<string> {
  const json = await apiFetch<{ url: string }>(
    `/auth/google/url?redirect=${encodeURIComponent(redirect)}`,
    { auth: false },
  );
  return json.url;
}

export async function fetchMe(): Promise<AuthUser> {
  const json = await apiFetch<{ data: AuthUser } | AuthUser>("/me");
  return "data" in json && json.data ? json.data : (json as AuthUser);
}

export async function logout(): Promise<void> {
  await apiFetch("/auth/logout", { method: "POST" });
}

export async function updateProfile(payload: Partial<UserProfile & { display_name: string }>) {
  const json = await apiFetch<{ data: AuthUser }>("/me/profile", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return json.data;
}

export async function fetchHistory() {
  return apiFetch<{
    tools: Array<{
      id: number;
      tool: string;
      input_text: string;
      output_text: string | null;
      status: string;
      created_at: string;
    }>;
    chat_sessions: Array<{ id: number; title: string; messages_count: number; created_at: string }>;
  }>("/me/history");
}

export async function fetchPublicProfile(username: string): Promise<AuthUser> {
  const json = await apiFetch<{ data: AuthUser }>(`/users/${username}`, { auth: false });
  return json.data;
}
