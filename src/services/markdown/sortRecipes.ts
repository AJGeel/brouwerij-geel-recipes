import { parseDuration } from "@/utils/duration/parseDuration";

import type { RecipeMetadata } from "./types";

/** `willekeurig` keeps the order as given, which is shuffled when scanning */
export const sortModes = ["willekeurig", "titel", "tijd"] as const;
export type SortMode = (typeof sortModes)[number];
export const defaultSortMode: SortMode = "willekeurig";

export const isSortMode = (
  value: string | null | undefined,
): value is SortMode => sortModes.some((mode) => mode === value);

export const parseSortMode = (value: string | null | undefined): SortMode =>
  isSortMode(value) ? value : defaultSortMode;

type Sortable = { metadata: Pick<RecipeMetadata, "title" | "duration"> };

const toSeconds = (durationString: string) => {
  const { years, months, days, hours, minutes, seconds } =
    parseDuration(durationString) ?? {};

  return (
    ((((years ?? 0) * 365 + (months ?? 0) * 30 + (days ?? 0)) * 24 +
      (hours ?? 0)) *
      60 +
      (minutes ?? 0)) *
      60 +
      (seconds ?? 0) || 0
  );
};

const byTitle = (a: Sortable, b: Sortable) =>
  a.metadata.title.localeCompare(b.metadata.title, "nl");

export const sortRecipes = <T extends Sortable>(
  recipes: T[],
  mode: SortMode,
) => {
  switch (mode) {
    case "titel":
      return [...recipes].sort(byTitle);
    case "tijd":
      return [...recipes].sort(
        (a, b) =>
          toSeconds(a.metadata.duration) - toSeconds(b.metadata.duration) ||
          byTitle(a, b),
      );
    default:
      return recipes;
  }
};
