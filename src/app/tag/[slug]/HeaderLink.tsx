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
      className={`flex items-center gap-2 rounded-sm text-gray-900 duration-150 outline outline-2 outline-offset-2 outline-transparent hover:outline-amber-100 focus:outline-amber-100 active:scale-95 active:opacity-70 select-none`}
    >
      {isLeft && <ChevronLeftIcon className="w-4 h-4" />}
      <p>{title}</p>
      {!isLeft && <ChevronRightIcon className="w-4 h-4" />}
    </Link>
  </div>
);

export default HeaderLink;
