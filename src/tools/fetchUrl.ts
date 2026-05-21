/**
 * fetch_url(url)
 * Récupère le contenu textuel d'une URL.
 * Hautement optimisé pour éliminer le surplus de tokens d'entrée.
 */
export async function fetchUrl(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; ReActAgent/1.0)",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText} — ${url}`);
  }

  const html = await response.text();

  // Élimination des balises, scripts, styles et formatage compact anti-bloat
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0) // Supprime les lignes vides consommatrices de tokens
    .join("\n")
    .replace(/ {2,}/g, " ") // Condense les espaces consécutifs multiples
    .trim();

  // Taille maximale réduite à 3500 caractères : idéal pour préserver le contexte sans saturer l'historique
  return text.slice(0, 3500);
}