type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function llm(messages: Message[]) {
  const apiUrl = process.env.GROQ_API_URL;
  if (!apiUrl) {
    throw new Error("Groq API URL not set in .env");
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Groq API key not set in .env");
  }

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
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Groq API Error ${response.status}:\n${errorText}`
    );
  }

  return response.json();
}