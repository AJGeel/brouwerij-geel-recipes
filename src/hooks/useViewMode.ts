import { usePersistedParams } from "@/hooks/usePersistedParam";
import { defaultViewMode, viewModes } from "@/services/ui/viewMode";

export const [useViewMode, setViewMode] = usePersistedParams({
  param: "weergave",
  storageKey: "viewMode",
  values: viewModes,
  defaultValue: defaultViewMode,
});
