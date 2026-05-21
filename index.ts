import { cleanJsonResponse, formatContent } from "./src/components/formatOfResponse";
import { getHTMLPages } from "./src/components/getHTMLPages";
import { llm } from "./src/modules/LLM";

import { pagesUrl, rules } from "./src/constant/LLMNeeds.constants";

type ReviewResult = {
  valid: boolean;
  score: number;
  missing: string[];
  hallucinations: string[];
  feedback: string;
  improved_summary: string;
};

async function main() {
  const allPages = await getHTMLPages(pagesUrl);

  let writeInFile = "";

  for (const [url, html] of Object.entries(allPages)) {
    if (!html) continue;

    console.log(`\n=== ANALYSE : ${url} ===\n`);

    let summary = "";
    let valid = false;

    let attempts = 0;
    const maxAttempts = 3;

    while (!valid && attempts < maxAttempts) {
      console.log(`Tentative ${attempts + 1}`);

      // =========================
      // STEP 1 — GENERATE SUMMARY
      // =========================

      const summarizePrompt = rules.summarize(html);

      const summaryResponse: any = await llm([
        {
          role: "system",
          content: summarizePrompt.system,
        },
        {
          role: "user",
          content: summarizePrompt.user,
        },
      ]);

      summary =
        summaryResponse?.choices?.[0]?.message?.content || "";

      if (!summary) {
        throw new Error("No summary generated");
      }

      // =========================
      // STEP 2 — REVIEW SUMMARY
      // =========================

      const reviewPrompt = rules.review(html, summary);

      const reviewResponse: any = await llm([
        {
          role: "system",
          content: reviewPrompt.system,
        },
        {
          role: "user",
          content: reviewPrompt.user,
        },
      ]);

      const rawReview =
        reviewResponse?.choices?.[0]?.message?.content || "";

      let review: ReviewResult;

      try {
        const cleaned = cleanJsonResponse(rawReview);

        review = JSON.parse(cleaned);
      } catch (error) {
        console.error("\nJSON PARSE ERROR\n");
        console.error(rawReview);

        review = {
          valid: false,
          score: 0,
          missing: [],
          hallucinations: [],
          feedback: "Invalid JSON returned by model",
          improved_summary: summary,
        };
      }

      console.log(`Score: ${review.score}/10`);
      console.log(`Valid: ${review.valid}`);

      if (review.feedback) {
        console.log(`Feedback: ${review.feedback}`);
      }

      if (review.missing.length > 0) {
        console.log("Missing:", review.missing);
      }

      if (review.hallucinations.length > 0) {
        console.log(
          "Hallucinations:",
          review.hallucinations
        );
      }

      valid = review.valid;

      // Self-healing loop
      if (!valid) {
        summary = review.improved_summary;
      }

      attempts++;
    }

    const result = `\n\n${formatContent(
      summary,
      url
    )}\n\n`;

    writeInFile += result;
  }

  await Bun.write("notes/rapport.md", writeInFile);

  console.log("\nRapport généré : notes/rapport.md");
}

main().catch(console.error);