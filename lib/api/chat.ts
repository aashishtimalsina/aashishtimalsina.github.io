import { apiFetch } from "./client";

export type ChatMessage = {
  id: number;
  role: string;
  content: string;
  created_at: string;
};

export async function sendChatMessage(message: string, sessionId?: number) {
  const json = await apiFetch<{
    data: {
      session_id: number;
      reply: string;
      messages: ChatMessage[];
    };
  }>("/chat", {
    method: "POST",
    body: JSON.stringify({ message, session_id: sessionId }),
  });
  return json.data;
}
