"use client";

import { ReactNode } from "react";

import Reveal from "@/components/Reveal";
import { useQueryParam } from "@/hooks/useQueryParam";
import { searchRecipes } from "@/services/markdown/searchRecipes";
import { sortRecipes } from "@/services/markdown/sortRecipes";
import type { RecipeMetadata } from "@/services/markdown/types";

import RecipeRow from "./Recipe/RecipeRow";
import RecipeSearch, { searchParam } from "./RecipeSearch";
import { useSortMode } from "../hooks/useSortMode";
import { useViewMode } from "../hooks/useViewMode";

export type OverviewRecipe = {
  slug: string;
  metadata: Pick<RecipeMetadata, "title" | "duration" | "imageSlug">;
  durationLabel: string;
  searchText: string;
};

type Props = {
  recipes: OverviewRecipe[];
  cards: Record<string, ReactNode>;
};

const RecipeOverview = ({ recipes, cards }: Props) => {
  const sortMode = useSortMode();
  const viewMode = useViewMode();
  const query = useQueryParam(searchParam) ?? "";
  const sortedRecipes = sortRecipes(recipes, sortMode);

  if (viewMode === "kaarten") {
    return (
      <div className="mt-12 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedRecipes.map(({ slug }, index) => (
          <Reveal
            key={`${sortMode}-${slug}`}
            index={index + 1}
            total={sortedRecipes.length}
          >
            {cards[slug]}
          </Reveal>
        ))}
      </div>
    );
  }


  const foundRecipes = searchRecipes(sortedRecipes, query);

  return (
    <div className="mt-10">
      <Reveal index={0}>
        <RecipeSearch />
      </Reveal>
      {foundRecipes.length === 0 ? (
        <p className="mt-8 text-gray-500">Whoops, geen recepten gevonden!</p>
      ) : (
        <div className="mt-4 divide-y divide-amber-100">
          {foundRecipes.map(({ slug, metadata, durationLabel }, index) => (
            <Reveal
              key={`${sortMode}-${slug}`}
              index={index + 1}
              total={foundRecipes.length}
            >
              <RecipeRow
                slug={slug}
                title={metadata.title}
                durationLabel={durationLabel}
                imageSlug={metadata.imageSlug}
              />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeOverview;
