import { createSignal, Show } from "solid-js";
import search from "../api/search";

const [searchText, setSearchText] = createSignal("");
const [failed, setFailed] = createSignal(false);
const [loading, setLoading] = createSignal(false);

async function gotoFirstRedditResult() {
  if (!searchText()) return;

  setFailed(false);
  setLoading(true);
  const result = await search(searchText());

  if (!result) {
    setLoading(false);
    setFailed(true);
    return;
  }

  window.location.href = result;
}

export default function Search() {
  const Loading = <div>Please hold... &#128222;</div>;

  return (
    <>
      <div>
        <Show when={!loading()} fallback={Loading}>
          <input
            class="border outline-none"
            value={searchText()}
            onInput={(e) => setSearchText((e.target as HTMLInputElement).value)}
            placeholder="Search all of reddit..."
            autofocus
          />
          <button
            class="border border-orange-400 hover:border-orange-300 px-1 rounded bg-orange-200 hover:bg-orange-100 transition-colors"
            onClick={gotoFirstRedditResult}
          >
            Try my luck
          </button>
        </Show>
      </div>
      <Show when={failed()}>
        <div class="text-orange-600 mt-5">No results found!</div>
      </Show>
    </>
  );
}
