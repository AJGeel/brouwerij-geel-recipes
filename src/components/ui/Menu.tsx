"use client";

import type { ComponentProps } from "react";

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
          "min-w-40 origin-(--transform-origin) rounded-md bg-surface p-1 text-sm text-gray-900 shadow-md outline-1 outline-amber-200 duration-150 outline-solid data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
          className,
        )}
        {...props}
      />
    </BaseMenu.Positioner>
  </BaseMenu.Portal>
);

export const MenuSeparator = ({
  className,
  ...props
}: Omit<ComponentProps<typeof BaseMenu.Separator>, "className"> & {
  className?: string;
}) => (
  <BaseMenu.Separator
    className={cn("-mx-1 my-1 h-px bg-amber-100", className)}
    {...props}
  />
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
      "flex cursor-pointer items-center gap-2 rounded-xs px-2 py-1.5 outline-hidden duration-150 select-none data-highlighted:bg-amber-100/60",
      className,
    )}
    {...props}
  >
    <span className="flex size-4 shrink-0 items-center justify-center">
      <BaseMenu.RadioItemIndicator>
        <CheckIcon weight="bold" className="size-3.5 text-amber-500" />
      </BaseMenu.RadioItemIndicator>
    </span>
    {children}
  </BaseMenu.RadioItem>
);
