export default async function search(query: string): Promise<string | null> {
  const response = await fetch(`/api/search?query=${query}`);
  if (!response.ok) {
    return null;
  }

  const { link } = await response.json();
  return link;
}
