"use client";

import { ComponentProps } from "react";

import { Menu as BaseMenu } from "@base-ui/react/menu";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/utils/cn";

export const Menu = BaseMenu.Root;
export const MenuTrigger = BaseMenu.Trigger;
export const MenuRadioGroup = BaseMenu.RadioGroup;

type ContentProps = Omit<ComponentProps<typeof BaseMenu.Popup>, "className"> &
  Pick<
    ComponentProps<typeof BaseMenu.Positioner>,
    "side" | "align" | "sideOffset"
  > & { className?: string };

export const MenuContent = ({
  side,
  align,
  sideOffset = 8,
  className,
  ...props
}: ContentProps) => (
  <BaseMenu.Portal>
    <BaseMenu.Positioner
      side={side}
      align={align}
      sideOffset={sideOffset}
      className="z-30"
    >
      <BaseMenu.Popup
        className={cn(
          "min-w-40 origin-[var(--transform-origin)] rounded-md bg-surface p-1 text-sm text-gray-900 shadow-md outline outline-1 outline-amber-200 duration-150 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
          className,
        )}
        {...props}
      />
    </BaseMenu.Positioner>
  </BaseMenu.Portal>
);

type RadioItemProps = Omit<
  ComponentProps<typeof BaseMenu.RadioItem>,
  "className"
> & { className?: string };

export const MenuRadioItem = ({
  children,
  className,
  ...props
}: RadioItemProps) => (
  <BaseMenu.RadioItem
    className={cn(
      "flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none duration-150 data-[highlighted]:bg-amber-100/60",
      className,
    )}
    {...props}
  >
    <span className="flex h-4 w-4 shrink-0 items-center justify-center">
      <BaseMenu.RadioItemIndicator>
        <CheckIcon weight="bold" className="h-3.5 w-3.5 text-amber-500" />
      </BaseMenu.RadioItemIndicator>
    </span>
    {children}
  </BaseMenu.RadioItem>
);
