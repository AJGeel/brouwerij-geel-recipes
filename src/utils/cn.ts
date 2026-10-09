import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combines class names and resolves conflicting Tailwind classes (last wins) */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
