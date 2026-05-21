// Charger son Skills ici en rapport aux skills trouver dans le folder `/skills`
export const ACTIVE_SKILLS = ["marseillais"];

export const TOOLS = [
  {
    type: "function",
    function: {
      name: "fetch_url",
      description: "Extract text from a website URL. Use this to search or gather context.",
      parameters: {
        type: "object",
        properties: {
          url: { type: "string" },
        },
        required: ["url"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "run_js",
      description: "Execute mathematical calculations or data parsing code. Never use this to print plain text or markdown contents.",
      parameters: {
        type: "object",
        properties: {
          code: { type: "string", description: "Executable JS snippet without raw multiline strings." },
        },
        required: ["code"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "save_note",
      description: "Save the final markdown report or text document to notes/rapport.md.",
      parameters: {
        type: "object",
        properties: {
          content: { type: "string", description: "The content to write into the report file." },
        },
        required: ["content"],
      },
    },
  },
];

export const MISSION = `
Tu présentes une URL intéressante de manière claire, moderne et naturelle.

Le contenu doit inclure :
- un court résumé ;
- des titres et sous-titres ;
- un slogan ;
- les points importants ;
- une structure Markdown propre.

Format attendu :
# Titre
## Sous-titre
- listes
\`\`\`code\`\`\` si nécessaire

Le ton doit rester flexible pour permettre l’utilisation d’un style ou d’un personnage personnalisé.

---

# Ne jamais enlever cette partie
Le rendu doit être rédigé avec un Markdown propre et lisible.
Ne jamais utiliser de caractères d'échappement comme \\n :
utiliser de vrais retours à la ligne et un formatage naturel.
`;