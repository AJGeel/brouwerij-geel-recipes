import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { cn } from "@/utils/cn";

type Props = {
  href: string;
  isLeft: boolean;
  title: string;
  className?: string;
};

const HeaderLink = ({ href, isLeft, title, className }: Props) => (
  <div className={cn("flex w-36", !isLeft && "hidden md:flex", className)}>
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-xs text-gray-900 outline-2 outline-offset-2 outline-transparent duration-150 outline-solid select-none hover:outline-amber-100 focus:outline-amber-100 active:scale-95 active:opacity-70`}
    >
      {isLeft && <CaretLeftIcon weight="bold" className="size-4" />}
      <p>{title}</p>
      {!isLeft && <CaretRightIcon weight="bold" className="size-4" />}
    </Link>
  </div>
);

export default HeaderLink;
