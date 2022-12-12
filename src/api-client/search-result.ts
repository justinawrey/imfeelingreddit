export default class SearchResult {
  title: string;
  link: string;
  displayLink: string;
  snippet: string;
  snippetHighlightedWords: string[];
  date: string;

  constructor(resultJson: any) {
    this.title = resultJson["title"];
    this.link = resultJson["link"];
    this.displayLink = resultJson["displayed_link"];
    this.snippet = resultJson["snippet"];
    this.date = resultJson["date"];

    if (resultJson["snippet_highlighted_words"]) {
      this.snippetHighlightedWords = [
        ...new Set(resultJson["snippet_highlighted_words"] as string[]),
      ].sort((a, b) => b.length - a.length);
    } else {
      this.snippetHighlightedWords = [];
    }
  }

  get highlightedSnippet() {
    let highlightedSnippet = this.snippet;
    this.snippetHighlightedWords.forEach((word) => {
      const re = new RegExp(`(?<!<b>)${word}(?!<\/b>)`, "g");
      highlightedSnippet = highlightedSnippet.replace(re, `<b>${word}</b>`);
    });
    return highlightedSnippet;
  }

  // Sometimes 'site:reddit.com' doesn't work so filter manually (maybe its just the scraper?)
  isRedditLink() {
    return this.link.includes("reddit.com");
  }
}
