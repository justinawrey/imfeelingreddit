async function searchAll(query: string, baseURL?: URL): Promise<any> {
  const relativeURL = `/api/search?query=${query}`;
  let response: Response;

  if (baseURL) {
    response = await fetch(new URL(relativeURL, baseURL));
  } else {
    response = await fetch(relativeURL);
  }

  return response.json();
}

async function searchFirst(
  query: string,
  baseURL?: URL
): Promise<string | null> {
  const results = await searchAll(query, baseURL);
  const hasResults = results["organic_results"]?.length > 0;

  return hasResults ? results["organic_results"][0]["link"] : null;
}

export { searchAll, searchFirst };
