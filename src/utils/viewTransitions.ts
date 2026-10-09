/**
 * Transition types for `<Link transitionTypes>`. The page and content
 * transitions in components/transitions animate according to these.
 */
export const navForward = ["nav-forward"];
export const navBack = ["nav-back"];

/** Names of the elements that morph between a recipe card and its page */
export const recipeTransitionName = {
  image: (slug: string) => `recipe-image-${slug}`,
  title: (slug: string) => `recipe-title-${slug}`,
};
