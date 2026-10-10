"use client";

import { ComponentProps } from "react";

import { Input as BaseInput } from "@base-ui/react/input";

import { cn } from "@/utils/cn";

type Props = Omit<ComponentProps<typeof BaseInput>, "className"> & {
  className?: string;
};

/** A text input in the site's look, a thin layer over Base UI */
export const Input = ({ className, ...props }: Props) => (
  <BaseInput
    className={cn(
      "h-10 w-full rounded-md bg-amber-100/50 px-3 text-sm text-gray-900 outline outline-2 outline-transparent duration-150 placeholder:text-gray-400 focus:outline-amber-200",
      className,
    )}
    {...props}
  />
);
