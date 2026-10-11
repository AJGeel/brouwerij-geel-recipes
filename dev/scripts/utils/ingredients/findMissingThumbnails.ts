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

/** Several ingredients can share one image file, which only has to be made once */
export const groupMissingByImage = (missing: MissingThumbnail[]) =>
  [...Map.groupBy(missing, ({ imageSlug }) => imageSlug)].map(
    ([imageSlug, items]) => ({
      imageSlug,
      ingredients: [...new Set(items.map(({ ingredient }) => ingredient))],
    }),
  );
