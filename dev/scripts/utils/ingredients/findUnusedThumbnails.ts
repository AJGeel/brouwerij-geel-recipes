import type { MarkdownRecipe } from "@/services/markdown/types";

import { ingredientImageDirectory, placeholderImageSlug } from "../devConfig";

/** Image slugs in the ingredient image directory that no recipe refers to */
export const findUnusedThumbnails = (
  recipes: MarkdownRecipe[],
  fileNames: string[],
) => {
  const used = new Set(
    recipes.flatMap(({ metadata }) =>
      metadata.ingredients.map(({ imageSlug }) => imageSlug),
    ),
  );

  return fileNames
    .map((fileName) => `${ingredientImageDirectory}${fileName}`)
    .filter((slug) => slug !== placeholderImageSlug && !used.has(slug))
    .sort();
};
