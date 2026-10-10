import { usePersistedParams } from "@/hooks/usePersistedParam";
import { defaultSortMode, sortModes } from "@/services/markdown/sortRecipes";

export const [useSortMode, setSortMode] = usePersistedParams({
  param: "sorteer",
  storageKey: "sortMode",
  values: sortModes,
  defaultValue: defaultSortMode,
});
