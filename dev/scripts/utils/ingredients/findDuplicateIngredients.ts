import type { MarkdownRecipe } from "@/services/markdown/types";

export type DuplicateReason = "same-thumbnail" | "similar-name";

export type DuplicateGroup = {
  names: string[];
  reasons: DuplicateReason[];
};

// Keeps short names like `gin`, `rum` and `ijs` from losing their last letters
const stem = (word: string) =>
  word.replace(/(.{2,})en$/, "$1").replace(/(.{3,})s$/, "$1");

/**
 * Crude Dutch normalisation: ignores case, accents, parentheses, hyphens
 * and spaces, and strips plural endings (`uien` → `ui`, `tomaten` → `tomaat`).
 */
export const normalizeIngredientName = (name: string) =>
  stem(
    name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\([^)]*\)/g, "")
      .replace(/[^a-z]/g, ""),
  ).replace(/([aeou])\1/g, "$1");

const groupBy = (
  recipes: MarkdownRecipe[],
  getKey: (name: string, imageSlug: string) => string,
) => {
  const groups = new Map<string, Set<string>>();

  for (const { metadata } of recipes) {
    for (const { name, imageSlug } of metadata.ingredients) {
      const key = getKey(name, imageSlug);
      groups.set(key, (groups.get(key) ?? new Set()).add(name));
    }
  }

  return [...groups.values()].filter((names) => names.size > 1);
};

/** Ingredients that are likely the same thing under a different wording */
export const findDuplicateIngredients = (
  recipes: MarkdownRecipe[],
): DuplicateGroup[] => {
  const found = new Map<string, DuplicateGroup>();

  const add = (names: Set<string>, reason: DuplicateReason) => {
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    const key = sorted.join("\n");
    const group = found.get(key) ?? { names: sorted, reasons: [] };

    group.reasons.push(reason);
    found.set(key, group);
  };

  groupBy(recipes, (_, imageSlug) => imageSlug).forEach((names) =>
    add(names, "same-thumbnail"),
  );
  groupBy(recipes, (name) => normalizeIngredientName(name)).forEach((names) =>
    add(names, "similar-name"),
  );

  return [...found.values()].sort((a, b) =>
    a.names[0].localeCompare(b.names[0]),
  );
};
