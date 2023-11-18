import { sortMap } from "@/utils/sortMap";

import { MarkdownRecipe } from "./types";

const accumulatorFn = (
  inputArray: string[],
  accumulator: Map<string, number>
) =>
  inputArray.forEach((item) => {
    if (!accumulator.has(item)) {
      accumulator.set(item, 1);
      return;
    }

    accumulator.set(item, accumulator.get(item)! + 1);
  });

export const generateTags = (recipes: MarkdownRecipe[]) => {
  const tagsWithCounts = recipes.reduce((accumulator, recipe) => {
    const uniqueIngredients = recipe.metadata.ingredients.map(
      (item) => item.name
    );
    const uniqueTags = recipe.metadata.tags;

    accumulatorFn(uniqueIngredients, accumulator);
    accumulatorFn(uniqueTags, accumulator);

    return accumulator;
  }, new Map<string, number>());

  const sortedTagsWithCounts = sortMap(tagsWithCounts);

  return sortedTagsWithCounts;
};
