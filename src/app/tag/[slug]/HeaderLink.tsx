import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type Props = {
  href: string;
  isLeft: boolean;
  title: string;
};

const HeaderLink = ({ href, isLeft, title }: Props) => (
  <div className={`flex w-36 ${!isLeft && "hidden md:block"}`}>
    <Link
      href={href}
      className={`flex select-none items-center gap-2 rounded-sm text-gray-900 outline outline-2 outline-offset-2 outline-transparent duration-150 hover:outline-amber-100 focus:outline-amber-100 active:scale-95 active:opacity-70`}
    >
      {isLeft && <ChevronLeftIcon className="h-4 w-4" />}
      <p>{title}</p>
      {!isLeft && <ChevronRightIcon className="h-4 w-4" />}
    </Link>
  </div>
);

export default HeaderLink;
