import { MISSION, TOOLS } from "./src/constant/tools.constants";
import { llm, type Message } from "./src/modules/LLM";
import { fetchUrl } from "./src/tools/fetchUrl";
import { runJs } from "./src/tools/runJs";
import { saveNote } from "./src/tools/saveNote";

const MAX_TURNS = 15;

// ─── Dispatcher d'outils ─────────────────────────────────────────────────────

async function execute(name: string, args: Record<string, string>): Promise<string> {
  switch (name) {
    case "fetch_url":
      return await fetchUrl(args.url!);
    case "run_js":
      return await runJs(args.code!);
    case "save_note":
      return await saveNote(args.content!);
    default:
      return `❌ Outil inconnu : "${name}"`;
  }
}

// ─── Boucle ReAct ────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀 Démarrage de l'agent ReAct");
  console.log(`📋 Mission : ${MISSION.trim()}\n`);

  const messages: Message[] = [
    {
      role: "system",
      content: "Tu es un agent de recherche et de rédaction autonome. Tu penses à voix haute avant chaque action. REGLE ABSOLUE : N'utilise JAMAIS 'run_js' pour générer, formater ou afficher du texte ou du Markdown via un console.log. Pour sauvegarder ton travail ou écrire le rapport final, utilise exclusivement l'outil 'save_note'. Quand ta mission est terminée et le rapport sauvegardé, conclus sans appeler d'outil.",
    },
    {
      role: "user",
      content: MISSION.trim(),
    },
  ];

  let turn = 0;

  while (turn < MAX_TURNS) {
    turn++;
    console.log(`\n── Tour ${turn} ${"─".repeat(44 - String(turn).length)}`);

    const { finish_reason, message } = await llm(messages, TOOLS);

    console.log(`stop_reason : ${finish_reason}`);

    if (finish_reason === "stop") {
      console.log("\n✅ Mission terminée.");
      if (message.content) {
        console.log(`\n💬 Réponse finale :\n${message.content}`);
      }
      break;
    }

    if (finish_reason === "tool_calls") {
      messages.push(message);
      const toolCalls = message.tool_calls ?? [];

      const toolPromises = toolCalls.map(async (toolCall) => {
        const name = toolCall.function.name;
        let args: Record<string, string>;

        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch {
          args = {};
          console.warn(`⚠️ Arguments JSON invalides pour ${name}`);
        }

        const argsPreview = JSON.stringify(args).slice(0, 60);
        console.log(`🔧 ${name}(${argsPreview}...)`);

        let result: string;
        try {
          result = await execute(name, args);
        } catch (err: any) {
          result = `❌ Erreur lors de l'exécution : ${err.message}`;
        }

        console.log(`📤 → ${result.slice(0, 120)}... `);

        return {
          role: "tool" as const,
          tool_call_id: toolCall.id,
          content: result,
        };
      });

      const toolResponses = await Promise.all(toolPromises);
      messages.push(...toolResponses);
      continue;
    }

    console.warn(`⚠️ finish_reason inattendu: "${finish_reason}". Arrêt.`);
    break;
  }

  if (turn >= MAX_TURNS) {
    console.log(`\n⛔ Limite de ${MAX_TURNS} tours atteinte.`);
  }

  console.log("\n📄 Rapport disponible dans : notes/rapport.md\n");
}

main().catch(console.error);