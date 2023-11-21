import matter from "gray-matter";

import { RecipeMetadata } from "./types";

export const parseRecipe = (fileName: string) => {
  const { data: metadata, content } = matter(fileName);

  if (
    typeof content !== "string" ||
    typeof metadata.title !== "string" ||
    typeof metadata.imageSlug !== "string" ||
    !Array.isArray(metadata.ingredients) ||
    metadata.ingredients.some((ingredient) => {
      typeof ingredient.name !== "string" ||
        typeof ingredient.amount !== "string" ||
        typeof ingredient.imageSlug !== "string";
    }) ||
    typeof metadata.duration !== "string" ||
    !Array.isArray(metadata.tags) ||
    metadata.tags.some((tag) => typeof tag !== "string")
  ) {
    return;
  }

  return {
    metadata,
    content,
  } as {
    metadata: RecipeMetadata;
    content: string;
  };
};
