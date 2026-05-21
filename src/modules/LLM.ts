type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

// Function/Promise pour faire dodo le code.
const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Appelle du LLM avec ses instructions
export async function llm(
  messages: Message[],
  retryCount = 0
) {
  const apiUrl = process.env.GROQ_API_URL;

  if (!apiUrl) {
    throw new Error("Groq API URL not set in .env");
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Groq API key not set in .env");
  }

  console.log("\n🤖 Sending request to Groq...");

  // Appelle API vers le LLM Groq avec les instructions
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

  const data: any = await response.json();

  // RATE LIMIT HANDLER
  if (
    !response.ok &&
    data?.error?.code === "rate_limit_exceeded"
  ) {
    const waitTime = 15000;

    console.log(
      "\n⚠️ Rate limit reached on Groq API."
    );

    console.log(
      `⏳ Waiting ${waitTime / 1000}s before retry...`
    );

    console.log(
      `🔁 Retry attempt: ${retryCount + 1}\n`
    );

    await sleep(waitTime);

    return llm(messages, retryCount + 1);
  }

  // OTHER API ERRORS HANDLER
  if (!response.ok) {
    console.error("\n❌ Groq API Error:");
    console.error(data);

    throw new Error(
      `Groq API Error ${response.status}:\n${JSON.stringify(
        data,
        null,
        2
      )}`
    );
  }

  console.log("✅ Response received from Groq.\n");

  return data;
}