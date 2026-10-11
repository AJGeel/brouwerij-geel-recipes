"use client";

import { ComponentType, Fragment } from "react";

import {
  Menu,
  MenuContent,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/Menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip";

type Props<T extends string> = {
  label: string;
  tooltip: string;
  icon: ComponentType<{ weight: "bold"; className: string }>;
  /** Options in groups, with a separator between the groups */
  optionGroups: readonly (readonly T[])[];
  labels: Record<T, string>;
  value: T;
  onChange: (value: T) => void;
};

export const OptionMenu = <T extends string>({
  label,
  tooltip,
  icon: Icon,
  optionGroups,
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
            className="group flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md p-2 duration-150 hover:bg-amber-100/50 data-popup-open:bg-amber-100/50 md:size-9"
          />
        }
      >
        <Icon
          weight="bold"
          className="size-full text-gray-400 duration-150 group-hover:text-gray-900 group-active:scale-90 group-data-popup-open:text-gray-900"
        />
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
    <MenuContent >
      <MenuRadioGroup
        value={value}
        onValueChange={(next) => {
          const option = optionGroups
            .flat()
            .find((candidate) => candidate === next);

          if (option) {
            onChange(option);
          }
        }}
      >
        {optionGroups.map((options, index) => (
          <Fragment key={options.join()}>
            {index > 0 && <MenuSeparator />}
            {options.map((option) => (
              <MenuRadioItem key={option} value={option} closeOnClick>
                {labels[option]}
              </MenuRadioItem>
            ))}
          </Fragment>
        ))}
      </MenuRadioGroup>
    </MenuContent>
  </Menu>
);
