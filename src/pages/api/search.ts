import type { APIRoute } from "astro";
import { JsonResponse, BadRequestResponse } from "./_response";

function makeRedditQuery(query: string): string {
  return `${query.trim()} site:reddit.com`;
}

async function getResults(query: string): Promise<any> {
  const response = await fetch(
    `https://serpapi.com/search.json?engine=google&api_key=${
      import.meta.env.SERPAPI_KEY
    }&q=${makeRedditQuery(query)}`
  );
  return response.json();
}

// Proxy request to serpapi
export const get: APIRoute = async ({ request }) => {
  const query = new URL(request.url).searchParams.get("query");

  if (!query) {
    return new BadRequestResponse("No query provided");
  }

  return new JsonResponse(await getResults(query));
};
