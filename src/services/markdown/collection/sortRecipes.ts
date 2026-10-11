import { milliseconds } from "date-fns/milliseconds";

import { parseDuration } from "@/utils/duration/parseDuration";

import { groupModes } from "./groupRecipes";
import type { RecipeMetadata } from "../types";

/**
 * `willekeurig` keeps the order as given, which is shuffled when scanning.
 * The group modes don't reorder recipes, they split them into sections.
 */
export const orderModes = ["willekeurig", "titel", "tijd"] as const;
export const sortModes = [...orderModes, ...groupModes] as const;
export type SortMode = (typeof sortModes)[number];
export const defaultSortMode: SortMode = "willekeurig";

export const isSortMode = (
  value: string | null | undefined,
): value is SortMode => sortModes.some((mode) => mode === value);

export const parseSortMode = (value: string | null | undefined): SortMode =>
  isSortMode(value) ? value : defaultSortMode;

type Sortable = { metadata: Pick<RecipeMetadata, "title" | "duration"> };

const toMilliseconds = (durationString: string) =>
  milliseconds(parseDuration(durationString) ?? {});

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
          toMilliseconds(a.metadata.duration) -
            toMilliseconds(b.metadata.duration) || byTitle(a, b),
      );
    default:
      return recipes;
  }
};
