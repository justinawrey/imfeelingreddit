import type { APIRoute } from "astro";

function makeRedditQuery(query: string): string {
  return `${query.trim()} site:reddit.com`;
}

function hasResults(results: any) {
  return results["organic_results"]?.length > 0;
}

async function getFirstRedditResultLink(query: string): Promise<string | null> {
  const response = await fetch(
    `https://serpapi.com/search.json?engine=google&api_key=ce8f801fa3ebd82083e30846141656e40256476030c9fc738f1927a5df60f63d&q=${makeRedditQuery(
      query
    )}`
  );
  const results = await response.json();

  return hasResults(results) ? results["organic_results"][0]["link"] : null;
}

// proxy request to serpapi
export const get: APIRoute = async ({ request }) => {
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const query = searchParams.get("query");

  if (!query) {
    return new Response("No query provided", { status: 400 });
  }

  const redditLink = await getFirstRedditResultLink(query);

  return new Response(
    JSON.stringify({
      link: redditLink,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
