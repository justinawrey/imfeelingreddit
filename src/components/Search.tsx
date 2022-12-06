import { createSignal } from "solid-js";
import search from "../api/search";

const [searchText, setSearchText] = createSignal("");

async function gotoFirstRedditResult() {
  const result = await search(searchText());

  if (!result) {
    return;
  }

  window.location.href = result;
}

export default function Search() {
  return (
    <div>
      <input
        class="border"
        type="search"
        value={searchText()}
        onInput={(e) => setSearchText((e.target as HTMLInputElement).value)}
      />
      <button onClick={gotoFirstRedditResult}>Search</button>
    </div>
  );
}
