"use client";

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react/dist/ssr";

import { setQueryParam, useQueryParam } from "@/hooks/useQueryParam";

import { Input } from "./ui/Input";

export const searchParam = "zoek";

const RecipeSearch = () => {
  const query = useQueryParam(searchParam) ?? "";

  return (
    <div className="relative">
      <MagnifyingGlassIcon
        weight="bold"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400"
      />
      <Input
        type="search"
        aria-label="Zoeken"
        placeholder="Zoek op titel, ingrediënt of tag"
        className="pr-10 pl-9 [&::-webkit-search-cancel-button]:hidden"
        value={query}
        onValueChange={(value) => setQueryParam(searchParam, value || null)}
      />
      {query && (
        <button
          aria-label="Zoekopdracht wissen"
          className="group absolute top-1/2 right-1 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md"
          onClick={() => setQueryParam(searchParam, null)}
        >
          <XIcon
            weight="bold"
            className="size-4 text-gray-400 duration-150 group-hover:text-gray-900 group-active:scale-90"
          />
        </button>
      )}
    </div>
  );
};

export default RecipeSearch;
