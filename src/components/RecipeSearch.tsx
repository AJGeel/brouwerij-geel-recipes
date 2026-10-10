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
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
      />
      <Input
        type="search"
        aria-label="Zoeken"
        placeholder="Zoek op titel, ingrediënt of tag"
        className="pl-9 pr-10 [&::-webkit-search-cancel-button]:hidden"
        value={query}
        onValueChange={(value) => setQueryParam(searchParam, value || null)}
      />
      {query && (
        <button
          aria-label="Zoekopdracht wissen"
          className="group absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md"
          onClick={() => setQueryParam(searchParam, null)}
        >
          <XIcon
            weight="bold"
            className="h-4 w-4 text-gray-400 duration-150 group-hover:text-gray-900 group-active:scale-90"
          />
        </button>
      )}
    </div>
  );
};

export default RecipeSearch;
