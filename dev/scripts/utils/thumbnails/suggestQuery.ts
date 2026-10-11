const withoutRemarks = (ingredient: string) =>
  ingredient.replace(/\([^)]*\)/g, "").trim();

/** A starting point for the image search. Pass `false` to search the name as-is */
export const suggestQuery = (ingredient: string, whiteBackground = true) =>
  whiteBackground
    ? `${withoutRemarks(ingredient)} op witte achtergrond`
    : withoutRemarks(ingredient);
