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
Choisis une URL aléatoire intéressante et fais-en une présentation claire et moderne.

Je veux :
- un résumé rapide ;
- des titres et sous-titres ;
- un slogan ;
- les points importants ;
- une mise en page propre en Markdown.

Utilise :
# Titres
## Sous-titres
- listes
\`\`\`code\`\`\` (si utile)

Style présentation professionnelle et facile à lire.

---

# Ne jamais enlever cette partie
Le rendu doit être rédigé en français, avec un Markdown propre et lisible.
Ne jamais utiliser de caractères d'échappement comme \\n dans la sortie :
le texte doit contenir de vrais retours à la ligne et un formatage naturel.
`;