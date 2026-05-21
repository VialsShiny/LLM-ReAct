export type Message = {
  role: "system" | "user" | "assistant" | "tool";
  content: string | null;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
};

export type ToolCall = {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

export type LLMResponse = {
  finish_reason: "stop" | "tool_calls" | "length";
  message: Message;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Appelle le LLM Groq avec support des tool_calls.
 * Gère le rate limit avec retry automatique.
 */
export async function llm(
  messages: Message[],
  tools: object[],
  retryCount = 0
): Promise<LLMResponse> {
  const apiUrl = process.env.GROQ_API_URL;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiUrl) throw new Error("GROQ_API_URL non défini dans .env");
  if (!apiKey) throw new Error("GROQ_API_KEY non défini dans .env");

  const response = await fetch(`${apiUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages,
      tools,
      tool_choice: "auto",
    }),
  });

  const data: any = await response.json();

  // RATE LIMIT — attente et retry
  if (!response.ok && data?.error?.code === "rate_limit_exceeded") {
    const waitTime = 15_000;
    console.log(`\n⚠️  Rate limit Groq. Attente ${waitTime / 1000}s... (retry #${retryCount + 1})`);

    await sleep(waitTime);
    return llm(messages, tools, retryCount + 1);
  }

  // AUTRES ERREURS API
  if (!response.ok) {
    throw new Error(
      `Groq API Error ${response.status}:\n${JSON.stringify(data, null, 2)}`
    );
  }

  const choice = data.choices?.[0];
  if (!choice) {
    throw new Error("Réponse Groq vide (aucun choice retourné)");
  }

  return {
    finish_reason: choice.finish_reason,
    message: choice.message,
  };
}