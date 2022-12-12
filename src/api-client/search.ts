import SearchResult from "./search-result";

function hasSearchResults(searchResults: any) {
  return searchResults["organic_results"]?.length > 0;
}

async function search(query: string, baseURL?: URL): Promise<any> {
  const relativeURL = `/api/search?query=${query}`;
  let response: Response;

  if (baseURL) {
    response = await fetch(new URL(relativeURL, baseURL));
  } else {
    response = await fetch(relativeURL);
  }

  return response.json();
}

async function searchAll(
  query: string,
  baseURL?: URL
): Promise<SearchResult[]> {
  const searchResults = await search(query, baseURL);
  const filteredSearchResults = searchResults["organic_results"]
    .map((searchResult: any) => new SearchResult(searchResult))
    .filter((searchResult: SearchResult) => searchResult.isRedditLink());

  return hasSearchResults(searchResults) ? filteredSearchResults : [];
}

async function searchFirst(
  query: string,
  baseURL?: URL
): Promise<string | null> {
  const searchResults = await search(query, baseURL);
  return hasSearchResults(searchResults)
    ? searchResults["organic_results"][0]["link"]
    : null;
}

export { searchAll, searchFirst };
