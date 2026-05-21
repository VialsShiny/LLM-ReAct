function resultToReturn(content: string) {
  return {
    content,
    date: Date.now()
  }
}

function formatContent(content: string, url: string) {
  return "### Scrapped Page : `" + url + "`\n```text\n" + content + "\n```";
}

function cleanJsonResponse(content: string): string {
  return content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

export { cleanJsonResponse, formatContent, resultToReturn };

