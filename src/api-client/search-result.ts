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
    this.snippetHighlightedWords = resultJson["snippet_highlighted_words"];
  }

  get highlightedSnippet() {
    let highlightedSnippet = this.snippet;
    this.snippetHighlightedWords.forEach((word) => {
      highlightedSnippet = highlightedSnippet.replace(word, `<b>${word}</b>`);
    });
    return highlightedSnippet;
  }
}
