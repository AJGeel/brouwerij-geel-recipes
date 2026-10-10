"use client";

import { ComponentProps } from "react";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

import { cn } from "@/utils/cn";

export const TooltipProvider = BaseTooltip.Provider;
export const Tooltip = BaseTooltip.Root;
export const TooltipTrigger = BaseTooltip.Trigger;

type ContentProps = Omit<ComponentProps<typeof BaseTooltip.Popup>, "className"> &
  Pick<
    ComponentProps<typeof BaseTooltip.Positioner>,
    "side" | "align" | "sideOffset"
  > & { className?: string };

export const TooltipContent = ({
  side,
  align,
  sideOffset = 8,
  className,
  ...props
}: ContentProps) => (
  <BaseTooltip.Portal>
    <BaseTooltip.Positioner
      side={side}
      align={align}
      sideOffset={sideOffset}
      className="z-30"
    >
      <BaseTooltip.Popup
        className={cn(
          "origin-[var(--transform-origin)] rounded-md px-2 py-1 text-sm text-gray-100 bg-gray-900 duration-150 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
          className,
        )}
        {...props}
      />
    </BaseTooltip.Positioner>
  </BaseTooltip.Portal>
);
