"use client";

import { ReactNode } from "react";

import Reveal from "@/components/Reveal";
import { sortRecipes } from "@/services/markdown/sortRecipes";
import type { MarkdownRecipe } from "@/services/markdown/types";

import { useSortMode } from "./useSortMode";

type Props = {
  recipes: {
    slug: string;
    metadata: Pick<MarkdownRecipe["metadata"], "title" | "duration">;
  }[];
  cards: Record<string, ReactNode>;
};

const SortedRecipeGrid = ({ recipes, cards }: Props) => {
  const mode = useSortMode();
  const sortedRecipes = sortRecipes(recipes, mode);

  return (
    <div className="mt-12 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedRecipes.map(({ slug }, index) => (
        <Reveal
          key={`${mode}-${slug}`}
          index={index + 1}
          total={sortedRecipes.length}
        >
          {cards[slug]}
        </Reveal>
      ))}
    </div>
  );
};

export default SortedRecipeGrid;
