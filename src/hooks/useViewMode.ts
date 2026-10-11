import { defaultViewMode, viewModes } from "@/services/ui/viewMode";
import { createPersistedParam } from "@/utils/createPersistedParam";

export const [useViewMode, setViewMode] = createPersistedParam({
  param: "weergave",
  storageKey: "viewMode",
  values: viewModes,
  defaultValue: defaultViewMode,
});
