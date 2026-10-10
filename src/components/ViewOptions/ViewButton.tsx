"use client";

import { ListIcon, SquaresFourIcon } from "@phosphor-icons/react/dist/ssr";

import { Menu, MenuContent, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@/components/ui/Menu";
import { setViewMode, useViewMode } from "@/hooks/useViewMode";
import { ViewMode, viewModes } from "@/services/ui/viewMode";


const labels: Record<ViewMode, string> = {
  'kaarten': "Toon als kaarten",
  'lijst': "Toon als lijst"
};

const ViewToggle = () => {
  const mode = useViewMode();

  const ActiveIcon = mode === 'kaarten' ? SquaresFourIcon : ListIcon

  return (
    <Menu>
      <MenuTrigger aria-label="Weergave" className="group flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md duration-150 hover:bg-amber-100/50 data-[popup-open]:bg-amber-100/50">
        <ActiveIcon
          weight="bold"
          className="h-5 w-5 text-gray-400 duration-150 group-hover:text-gray-900 group-active:scale-90 group-data-[popup-open]:text-gray-900"
        />
      </MenuTrigger>
      <MenuContent align="end">
        <MenuRadioGroup value={mode} onValueChange={(value) => setViewMode(value)}>
          {viewModes.map((viewMode) => <MenuRadioItem key={viewMode} closeOnClick value={viewMode}>
            {labels[viewMode]}
          </MenuRadioItem>)}

        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  );
};

export default ViewToggle;
