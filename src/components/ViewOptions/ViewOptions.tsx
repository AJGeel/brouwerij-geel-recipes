"use client";

import {
    ListIcon,
    SortAscendingIcon,
    SquaresFourIcon,
} from "@phosphor-icons/react/dist/ssr";

import { setSortMode, useSortMode } from "@/hooks/useSortMode";
import { setViewMode, useViewMode } from "@/hooks/useViewMode";
import { SortMode, sortModes } from "@/services/markdown/sortRecipes";
import { ViewMode, viewModes } from "@/services/ui/viewMode";

import { OptionMenu } from "./OptionMenu";

const viewLabels: Record<ViewMode, string> = {
    kaarten: "Toon als kaarten",
    lijst: "Toon als lijst",
};

const sortLabels: Record<SortMode, string> = {
    willekeurig: "Willekeurig",
    titel: "Titel (A–Z)",
    tijd: "Snel smikkelen",
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
                options={viewModes}
                labels={viewLabels}
                value={viewMode}
                onChange={setViewMode}
            />
            <OptionMenu
                label="Sorteren"
                tooltip="Pas sortering aan"
                icon={SortAscendingIcon}
                options={sortModes}
                labels={sortLabels}
                value={sortMode}
                onChange={setSortMode}
            />
        </div>
    );
};
