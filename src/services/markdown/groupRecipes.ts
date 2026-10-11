import type { Taxonomy } from "./taxonomy";
import type { MarkdownRecipe } from "./types";

export const groupModes = ["bier", "maaltijd"] as const;
export type GroupMode = (typeof groupModes)[number];

export const isGroupMode = (value: string): value is GroupMode =>
  groupModes.some((mode) => mode === value);

export type RecipeGroup = {
  name: string;
  slugs: string[];
};

export const otherGroupName = "Overig";

type Metadata = Pick<MarkdownRecipe["metadata"], "ingredients" | "tags">;

const beersOf = ({ ingredients }: Metadata, { beers }: Taxonomy) =>
  ingredients.map(({ name }) => name).filter((name) => beers.includes(name));

const mealTypesOf = ({ tags }: Metadata, { mealTypes }: Taxonomy) =>
  Object.keys(mealTypes).filter((mealType) =>
    mealTypes[mealType].some((tag) => tags.includes(tag)),
  );

const groupNamesOf = (
  mode: GroupMode,
  metadata: Metadata,
  taxonomy: Taxonomy,
) =>
  mode === "bier"
    ? beersOf(metadata, taxonomy)
    : mealTypesOf(metadata, taxonomy);

/**
 * Groups recipes by beer, biggest group first, or by meal type, in the order
 * of the taxonomy. A recipe can be in several groups. Recipes without a match
 * end up in a last group, and groups without recipes are left out.
 */
export const groupRecipes = (
  recipes: { slug: string; metadata: Metadata }[],
  mode: GroupMode,
  taxonomy: Taxonomy,
): RecipeGroup[] => {
  const groups = new Map<string, string[]>(
    mode === "maaltijd"
      ? Object.keys(taxonomy.mealTypes).map((name) => [name, []])
      : [],
  );
  const others: string[] = [];

  recipes.forEach(({ slug, metadata }) => {
    const names = groupNamesOf(mode, metadata, taxonomy);

    if (names.length === 0) {
      others.push(slug);
    }

    names.forEach((name) =>
      groups.set(name, [...(groups.get(name) ?? []), slug]),
    );
  });

  const grouped = Array.from(groups, ([name, slugs]) => ({
    name,
    slugs,
  })).filter(({ slugs }) => slugs.length > 0);

  if (mode === "bier") {
    grouped.sort(
      (a, b) => b.slugs.length - a.slugs.length || a.name.localeCompare(b.name),
    );
  }

  return others.length > 0
    ? [...grouped, { name: otherGroupName, slugs: others }]
    : grouped;
};
