import Link from "next/link";

const BackToRecipes = () => (
  <Link
    href="/"
    className="group flex h-48 items-center justify-center rounded-md border-2 border-amber-100 bg-surface duration-150 ease-in-out active:scale-95 active:opacity-75 md:h-64 relative"
  >
    <span className="text-gray-500 duration-1000 group-hover:scale-110">
      Terug naar alle recepten
    </span>
  </Link>
);

export default BackToRecipes;
