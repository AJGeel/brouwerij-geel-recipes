"use client";

import {
  ListIcon,
  SortAscendingIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react/dist/ssr";

import { setSortMode, useSortMode } from "@/hooks/useSortMode";
import { setViewMode, useViewMode } from "@/hooks/useViewMode";
import { groupModes } from "@/services/markdown/groupRecipes";
import type { SortMode } from "@/services/markdown/sortRecipes";
import { orderModes } from "@/services/markdown/sortRecipes";
import type { ViewMode } from "@/services/ui/viewMode";
import { viewModes } from "@/services/ui/viewMode";

import { OptionMenu } from "./OptionMenu";

const viewLabels: Record<ViewMode, string> = {
  kaarten: "Toon als kaarten",
  lijst: "Toon als lijst",
};

const sortLabels: Record<SortMode, string> = {
  willekeurig: "Willekeurig",
  titel: "Titel (A–Z)",
  tijd: "Snel smikkelen",
  bier: "Groepeer per bier",
  maaltijd: "Groepeer per maaltijd",
};

export const ViewOptions = () => {
  const viewMode = useViewMode();
  const sortMode = useSortMode();

  return (
    <div className="flex items-center gap-1 md:ml-auto">
      <OptionMenu
        label="Weergave"
        tooltip="Pas weergave aan"
        icon={viewMode === "kaarten" ? SquaresFourIcon : ListIcon}
        optionGroups={[viewModes]}
        labels={viewLabels}
        value={viewMode}
        onChange={setViewMode}
      />
      <OptionMenu
        label="Sorteren"
        tooltip="Pas sortering of groepering aan"
        icon={SortAscendingIcon}
        optionGroups={[orderModes, groupModes]}
        labels={sortLabels}
        value={sortMode}
        onChange={setSortMode}
      />
    </div>
  );
};
