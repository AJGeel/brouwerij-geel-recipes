"use client";

import type { ReactNode } from "react";

import Reveal from "@/components/Reveal";
import { useQueryParam } from "@/hooks/useQueryParam";
import type { GroupMode, RecipeGroup } from "@/services/markdown/groupRecipes";
import { isGroupMode } from "@/services/markdown/groupRecipes";
import { searchRecipes } from "@/services/markdown/searchRecipes";
import { sortRecipes } from "@/services/markdown/sortRecipes";
import type { RecipeMetadata } from "@/services/markdown/types";
import { cn } from "@/utils/cn";

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
  /** Cards without a morph, for a recipe that is in more than one group */
  repeatedCards: Record<string, ReactNode>;
  groups: Record<GroupMode, RecipeGroup[]>;
};

const RecipeOverview = ({ recipes, cards, repeatedCards, groups }: Props) => {
  const sortMode = useSortMode();
  const viewMode = useViewMode();
  const query = useQueryParam(searchParam) ?? "";
  const isCards = viewMode === "kaarten";

  const recipesBySlug = new Map(recipes.map((recipe) => [recipe.slug, recipe]));
  const sections: { name: string | null; recipes: OverviewRecipe[] }[] =
    isGroupMode(sortMode)
      ? groups[sortMode].map(({ name, slugs }) => ({
          name,
          recipes: slugs.flatMap((slug) => recipesBySlug.get(slug) ?? []),
        }))
      : [{ name: null, recipes: sortRecipes(recipes, sortMode) }];

  const visibleSections = (
    isCards
      ? sections
      : sections.map((section) => ({
          ...section,
          recipes: searchRecipes(section.recipes, query),
        }))
  ).filter((section) => section.recipes.length > 0);

  let revealIndex = 0;
  const shown = new Set<string>();
  const total = visibleSections.reduce(
    (sum, section) => sum + section.recipes.length,
    0,
  );

  return (
    <div className={isCards ? "mt-12" : "mt-10"}>
      {!isCards && (
        <Reveal index={0}>
          <RecipeSearch />
        </Reveal>
      )}
      {total === 0 && (
        <p className="mt-8 text-gray-500">Whoops, geen recepten gevonden!</p>
      )}
      {visibleSections.map(({ name, recipes: sectionRecipes }) => (
        <section
          key={`${sortMode}-${name}`}
          className={name ? "mt-10" : undefined}
        >
          {name && (
            <h2 className="text-xl font-bold text-gray-900">
              {name}
              <span className="ml-2 text-xs font-semibold text-gray-500">
                {sectionRecipes.length}
              </span>
            </h2>
          )}
          <div
            className={cn(
              isCards
                ? "grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                : "divide-y divide-amber-100",
              (name !== null || !isCards) && "mt-4",
            )}
          >
            {sectionRecipes.map(({ slug, metadata, durationLabel }) => {
              const isRepeat = shown.has(slug);
              shown.add(slug);
              const card = (isRepeat ? repeatedCards : cards)[slug];

              return (
                <Reveal
                  key={`${sortMode}-${name}-${slug}`}
                  index={++revealIndex}
                  total={total}
                >
                  {isCards ? (
                    card
                  ) : (
                    <RecipeRow
                      slug={slug}
                      title={metadata.title}
                      durationLabel={durationLabel}
                      imageSlug={metadata.imageSlug}
                      morph={!isRepeat}
                    />
                  )}
                </Reveal>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default RecipeOverview;
