import { createSignal, onMount } from "solid-js";
import search from "@api/search";
import { Button, Input } from "@components/lib";

const [searchText, setSearchText] = createSignal("");
const [failed, setFailed] = createSignal(false);
const [loading, setLoading] = createSignal(false);

function navigate(url: string) {
  window.location.href = url;
}

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

  navigate(result);
}

function filterBy(e: KeyboardEvent, event: string, cb: () => void) {
  if (e.key !== event) return;
  cb();
}

let input: HTMLInputElement | undefined;
const Loading = <p>Please hold... &#128222;</p>;
const SearchWidget = (
  <>
    <Input
      ref={input}
      value={searchText()}
      onInput={(e) => setSearchText((e.target as HTMLInputElement).value)}
      onKeyDown={(e) => filterBy(e, "Enter", gotoFirstRedditResult)}
      placeholder="Search all of reddit..."
    />
    <Button onClick={() => navigate("/results")}>Search</Button>
    <Button onClick={gotoFirstRedditResult}>Try my luck</Button>
  </>
);

export default function Search() {
  onMount(() => {
    // We are sure that the input exists here, as guaranteed by solid
    input!.focus();
  });

  return (
    <>
      <div>{loading() ? Loading : SearchWidget}</div>
      {failed() ? <p class="text-orange-600 mt-5">No results found!</p> : null}
    </>
  );
}
