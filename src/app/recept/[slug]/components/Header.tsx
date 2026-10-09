import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import RecipeTitleTransition from "./RecipeTitleTransition";
import ShareButton from "./ShareButton";

type Props = {
  slug: string;
  name: string;
};

const Header = ({ slug, name }: Props) => (
  <div className="sticky top-0 z-20 flex w-full items-center justify-between border-b-2 border-amber-100 bg-white md:relative md:border-b-0">
    <Link href="/" transitionTypes={["nav-back"]}>
      <button className="group flex h-16 w-16 cursor-pointer items-center justify-center duration-150 hover:bg-amber-100/50 active:scale-90">
        <ChevronLeftIcon className="h-6 w-6 shrink-0 text-gray-400 duration-150 group-hover:text-gray-900" />
      </button>
    </Link>
    <h1 className="text-2xl font-bold text-gray-900">
      Recept
      <span className="hidden md:inline-block">
        :{" "}
        <RecipeTitleTransition slug={slug} visibleOn="desktop">
          <span className="inline-block">{name}</span>
        </RecipeTitleTransition>
      </span>
    </h1>
    <ShareButton recipeName={name} />
  </div>
);

export default Header;
