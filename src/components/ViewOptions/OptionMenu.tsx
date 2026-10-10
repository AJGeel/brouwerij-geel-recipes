"use client";

import { ComponentType } from "react";

import {
  Menu,
  MenuContent,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
} from "@/components/ui/Menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip";

type Props<T extends string> = {
  label: string;
  tooltip: string;
  icon: ComponentType<{ weight: "bold"; className: string }>;
  options: readonly T[];
  labels: Record<T, string>;
  value: T;
  onChange: (value: T) => void;
};

export const OptionMenu = <T extends string>({
  label,
  tooltip,
  icon: Icon,
  options,
  labels,
  value,
  onChange,
}: Props<T>) => (
  <Menu>
    <Tooltip>
      <TooltipTrigger
        render={
          <MenuTrigger
            aria-label={label}
            className="group flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md p-2 duration-150 hover:bg-amber-100/50 data-[popup-open]:bg-amber-100/50 md:h-9 md:w-9"
          />
        }
      >
        <Icon
          weight="bold"
          className="h-full w-full text-gray-400 duration-150 group-hover:text-gray-900 group-active:scale-90 group-data-[popup-open]:text-gray-900"
        />
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
    <MenuContent >
      <MenuRadioGroup
        value={value}
        onValueChange={(next) => {
          const option = options.find((candidate) => candidate === next);

          if (option) {
            onChange(option);
          }
        }}
      >
        {options.map((option) => (
          <MenuRadioItem key={option} value={option} closeOnClick>
            {labels[option]}
          </MenuRadioItem>
        ))}
      </MenuRadioGroup>
    </MenuContent>
  </Menu>
);
