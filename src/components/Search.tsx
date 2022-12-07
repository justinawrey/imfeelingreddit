import { createSignal, Show } from "solid-js";
import search from "../api/search";

const [searchText, setSearchText] = createSignal("");
const [loading, setLoading] = createSignal(false);

async function gotoFirstRedditResult() {
  if (!searchText()) return;

  setLoading(true);
  const result = await search(searchText());

  if (!result) {
    setLoading(false);
    return;
  }

  window.location.href = result;
}

export default function Search() {
  const Loading = <div>Please hold... &#128222;</div>;

  return (
    <div>
      <Show when={!loading()} fallback={Loading}>
        <input
          class="border focus:outline-slate-300"
          value={searchText()}
          onInput={(e) => setSearchText((e.target as HTMLInputElement).value)}
          placeholder="Search all of reddit..."
        />
        <button
          class="border border-orange-400 hover:border-orange-300 px-1 rounded bg-orange-200 hover:bg-orange-100 transition-colors"
          onClick={gotoFirstRedditResult}
        >
          Try my luck
        </button>
      </Show>
    </div>
  );
}
