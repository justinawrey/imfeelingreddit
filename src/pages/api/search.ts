import type { APIRoute } from "astro";
import { JsonResponse } from "@util/json-response";

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
  const query = new URLSearchParams(new URL(request.url).search).get("query");

  if (!query) {
    return new Response("No query provided", { status: 400 });
  }

  return new JsonResponse(await getResults(query));
};
