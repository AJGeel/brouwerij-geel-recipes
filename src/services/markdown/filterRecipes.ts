import { MarkdownRecipe } from "./types";

export const filterRecipes = (recipes: MarkdownRecipe[], tag: string) =>
  recipes.filter(({ metadata }) => {
    const isInIngredients = metadata.ingredients.some(
      (ingredient) => ingredient.name === tag
    );
    const isInTags = metadata.tags.includes(tag);

    return isInIngredients || isInTags;
  });
