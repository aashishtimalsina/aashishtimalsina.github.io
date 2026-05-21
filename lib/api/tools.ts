import { apiFetch } from "@/lib/api/http";

export async function summarizeText(text: string) {
  const json = await apiFetch<{
    data: { id: number; tool: string; output: string; status: string; created_at: string };
  }>("/tools/summarize", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
  return json.data;
}

export async function humanizeText(text: string) {
  const json = await apiFetch<{
    data: { id: number; tool: string; output: string; status: string; created_at: string };
  }>("/tools/humanize", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
  return json.data;
}
