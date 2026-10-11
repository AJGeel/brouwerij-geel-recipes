import type { MarkdownRecipe } from "@/services/markdown/types";

export type MissingThumbnail = {
  recipe: string;
  ingredient: string;
  imageSlug: string;
};

export const findMissingThumbnails = (
  recipes: MarkdownRecipe[],
  imageExists: (imageSlug: string) => boolean,
): MissingThumbnail[] =>
  recipes.flatMap(({ slug, metadata }) =>
    metadata.ingredients
      .filter(({ imageSlug }) => !imageExists(imageSlug))
      .map(({ name, imageSlug }) => ({
        recipe: slug,
        ingredient: name,
        imageSlug,
      })),
  );
