import { createSignal, onMount } from "solid-js";
import { searchFirst } from "@api-client/search";
import { Button, Input } from "@components/lib";

const [searchText, setSearchText] = createSignal("");
const [failed, setFailed] = createSignal(false);
const [loading, setLoading] = createSignal(false);

function navigate(url: string) {
  window.location.href = url;
}

async function gotoFirstRedditResult() {
  setFailed(false);
  setLoading(true);
  const result = await searchFirst(searchText());

  if (!result) {
    setLoading(false);
    setFailed(true);
    return;
  }

  navigate(result);
}

let input: HTMLInputElement | undefined;
const Loading = <p>Please hold... &#128222;</p>;
const SearchWidget = (
  <>
    <Input
      ref={input}
      value={searchText()}
      onInput={(e) => setSearchText((e.target as HTMLInputElement).value)}
      onKeyDown={(e) =>
        e.key === "Enter" &&
        searchText() &&
        navigate(`/search?query=${searchText()}`)
      }
      placeholder="Search all of reddit..."
    />
    <Button
      onClick={() => searchText() && navigate(`/search?query=${searchText()}`)}
    >
      Search
    </Button>
    <Button onClick={() => searchText() && gotoFirstRedditResult()}>
      Try my luck
    </Button>
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
