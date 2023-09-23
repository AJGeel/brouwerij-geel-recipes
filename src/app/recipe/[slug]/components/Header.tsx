import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import ShareButton from "./ShareButton";

type Props = {
  name: string;
};

const Header = ({ name }: Props) => (
  <div className="w-full flex items-center justify-between">
    <Link href="/">
      <button className="w-16 h-16 flex items-center justify-center hover:bg-amber-100/50 cursor-pointer active:scale-90 duration-150 group">
        <ChevronLeftIcon className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-900 duration-150" />
      </button>
    </Link>
    <h1 className="font-bold text-2xl text-gray-900">
      Recept
      <span className="hidden md:inline-block">: {name}</span>
    </h1>
    <ShareButton recipeName={name} />
  </div>
);

export default Header;
