const pagesUrl = [
  "https://console.groq.com/keys",
  "https://www.gentlemates.com/esports?game=call-of-duty",
  "https://vials-shiny.vercel.app/",
  "https://alexis-pernette-porfolio.vercel.app/",
];

const rules = {
  summarize: (html: string) => ({
    system: `
Tu es un assistant expert en analyse de pages web.

Analyse précisément le HTML fourni.

Tu dois produire un résumé :
- clair
- structuré
- fiable
- sans hallucination
- prêt à être lu rapidement

FORMAT :
- Résumé global
- Objectif du site
- Fonctionnalités principales
- UX/UI
- Technologies probables
- Points forts
- Points faibles
- Conclusion concise
`,
    user: `
Voici une page HTML :

\`\`\`html
${html}
\`\`\`

Fais une analyse complète et professionnelle.
`,
  }),

  review: (html: string, summary: string) => ({
    system: `
Tu es un agent critique expert en validation de résumés HTML.

Ta mission :
- Vérifier si le résumé correspond réellement au HTML
- Détecter les hallucinations
- Détecter les oublis importants
- Vérifier la cohérence globale
- Vérifier si le résumé est exploitable

Tu dois répondre UNIQUEMENT en JSON valide.

Format obligatoire :

{
  "valid": boolean,
  "score": number,
  "missing": string[],
  "hallucinations": string[],
  "feedback": string,
  "improved_summary": string
}

RÈGLES :
- score = note sur 10
- valid = true uniquement si score >= 8
- improved_summary doit toujours contenir une meilleure version
- Ne jamais ajouter de texte hors JSON
`,
    user: `
HTML ORIGINAL :

\`\`\`html
${html}
\`\`\`

RÉSUMÉ GÉNÉRÉ :

\`\`\`
${summary}
\`\`\`

Analyse maintenant la qualité du résumé.
`,
  }),
};

export { pagesUrl, rules };

