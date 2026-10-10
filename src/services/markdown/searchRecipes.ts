import type { RecipeMetadata } from "./types";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export const createSearchText = ({
  title,
  ingredients,
  tags,
}: Pick<RecipeMetadata, "title" | "ingredients" | "tags">) =>
  normalize([title, ...ingredients.map(({ name }) => name), ...tags].join(" "));

export const searchRecipes = <T extends { searchText: string }>(
  recipes: T[],
  query: string,
) => {
  const words = normalize(query).split(/\s+/).filter(Boolean);

  return words.length === 0
    ? recipes
    : recipes.filter(({ searchText }) =>
        words.every((word) => searchText.includes(word)),
      );
};
