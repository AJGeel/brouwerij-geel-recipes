/**
 * Transition type for opening a recipe from a card. This is the only
 * navigation that morphs shared elements, see `Morph`, going back doesn't:
 * the cards then build up again like on any other page.
 */
export const openRecipe = "open-recipe";

/** Duration of the morph in ms, keep in sync with `.morph` in globals.css */
export const morphDuration = 500;

/** Name of the image that morphs between a recipe card and its page */
export const recipeImageTransitionName = (slug: string) =>
  `recipe-image-${slug}`;
