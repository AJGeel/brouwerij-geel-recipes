import { defaultSortMode, sortModes } from "@/services/markdown/sortRecipes";
import { createPersistedParam } from "@/utils/createPersistedParam";


export const [useSortMode, setSortMode] = createPersistedParam({
  param: "sorteer",
  storageKey: "sortMode",
  values: sortModes,
  defaultValue: defaultSortMode,
});
