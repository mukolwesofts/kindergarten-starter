import { chatbot } from "@/content/chatbot";

/**
 * Scripted demo replies. This is deliberately a single function so a
 * real backend or LLM can replace it later without touching the UI.
 */
export async function getReply(input: string): Promise<string> {
  const text = input.toLowerCase();

  const match = chatbot.replies.find((r) =>
    r.keywords.some((k) => text.includes(k)),
  );

  // Fake latency so the typing indicator feels real.
  await new Promise((resolve) => setTimeout(resolve, 700 + Math.random() * 500));

  return match?.reply ?? chatbot.fallback;
}
