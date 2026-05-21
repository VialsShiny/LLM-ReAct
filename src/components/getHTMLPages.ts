import * as cheerio from "cheerio";
type HTMLPagesResult = Record<string, string | null>;
export async function getHTMLPages(pagesUrl: string[]): Promise<HTMLPagesResult> {
  const entries = await Promise.all(
    pagesUrl.map(async (url) => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${url} (${response.status} ${response.statusText})`,
          );
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        let textContent = '';

        // Limiter le nombre de caractères pour un résumé court
        $('body *').each((index, element) => {
          if (textContent.length < 1000) {
            textContent += $(element).text();
          } else {
            return false;
          }
        });
        return [url, textContent] as const;
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return [url, null] as const;
      }
    }),
  );

  return Object.fromEntries(entries);
}
