"use client";

import { SortAscendingIcon } from "@phosphor-icons/react/dist/ssr";

import {
  Menu,
  MenuContent,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
} from "@/components/ui/Menu";
import {
  parseSortMode,
  SortMode,
  sortModes,
} from "@/services/markdown/sortRecipes";

import { setSortMode, useSortMode } from "./useSortMode";

const labels: Record<SortMode, string> = {
  willekeurig: "Willekeurig",
  titel: "Titel (A–Z)",
  tijd: "Snelste eerst",
};

const SortButton = () => {
  const mode = useSortMode();

  return (
    <Menu>
      {/* Only the icon scales when pressed: the menu is anchored to the trigger and would follow its size */}
      <MenuTrigger
        aria-label="Sorteren"
        className="group flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md duration-150 hover:bg-amber-100/50 data-[popup-open]:bg-amber-100/50"
      >
        <SortAscendingIcon
          weight="bold"
          className="h-5 w-5 text-gray-400 duration-150 group-hover:text-gray-900 group-active:scale-90 group-data-[popup-open]:text-gray-900"
        />
      </MenuTrigger>
      <MenuContent align="end">
        <MenuRadioGroup
          value={mode}
          onValueChange={(value) => setSortMode(parseSortMode(value))}
        >
          {sortModes.map((sortMode) => (
            <MenuRadioItem key={sortMode} value={sortMode} closeOnClick>
              {labels[sortMode]}
            </MenuRadioItem>
          ))}
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  );
};

export default SortButton;
