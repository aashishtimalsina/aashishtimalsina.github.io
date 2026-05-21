import { API_URL } from "@/lib/api/http";

export type ContactPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export async function submitContact(payload: ContactPayload): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errors = data.errors as Record<string, string[]> | undefined;
    const first = errors ? Object.values(errors).flat()[0] : null;
    throw new Error(first ?? data.message ?? "Failed to send message. Please try again.");
  }

  return data as { message: string };
}
