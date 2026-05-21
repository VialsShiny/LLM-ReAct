import { existsSync, mkdirSync } from "fs";

function encapsuledContent(content: any) {
  const timestamp = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
  return `
<details>
<summary>📦 Version (${timestamp}) — Cliquez pour dérouler</summary>

${content.trim()}

</details>

---
`.trim();
}

/**
 * save_note(content)
 * Écrit le nouveau rapport Markdown final dans notes/rapport.md.
 */
export async function saveNote(content: string): Promise<string> {
  const dir = "notes";
  const path = `${dir}/rapport.md`;

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  let existing = "";
  if (existsSync(path)) {
    existing = await Bun.file(path).text();
  }

  // Encapsuled Content
  let finalContent = encapsuledContent(content) + "\n" + existing;

  await Bun.write(path, finalContent + "\n");

  return `✅ Note sauvegardée (${content.length} chars) — Précédent encapsulé`;
}