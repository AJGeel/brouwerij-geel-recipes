import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import ShareButton from "./ShareButton";

type Props = {
  name: string;
};

const Header = ({ name }: Props) => (
  <div className="sticky top-0 z-20 flex w-full items-center justify-between border-b-2 border-amber-100 bg-white md:relative md:border-b-0">
    <Link href="/">
      <button className="group flex h-16 w-16 cursor-pointer items-center justify-center duration-150 hover:bg-amber-100/50 active:scale-90">
        <ChevronLeftIcon className="h-6 w-6 shrink-0 text-gray-400 duration-150 group-hover:text-gray-900" />
      </button>
    </Link>
    <h1 className="text-2xl font-bold text-gray-900">
      Recept
      <span className="hidden md:inline-block">: {name}</span>
    </h1>
    <ShareButton recipeName={name} />
  </div>
);

export default Header;
