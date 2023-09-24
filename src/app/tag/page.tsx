import { generateTags, scanAllRecipes } from "@/services/markdown";
import { capitalize } from "@/utils/capitalize";
import Link from "next/link";

const getTags = async () => {
  const allRecipes = scanAllRecipes();
  const allTags = generateTags(allRecipes);

  return allTags;
};

const Page = async () => {
  const tags = await getTags();
  const iterableTags = Array.from(tags);

  return (
    <div className="max-w-7xl w-full mx-auto p-5 sm:p-8">
      <h1 className="text-3xl md:text-4xl mt-8 font-bold text-gray-900 max-w-lg">
        Brouwerij Geel heeft recepten in thema:
      </h1>
      <div className="mt-4 -m-2">
        {iterableTags.map(([name, amount]) => (
          <Link
            href={`/tag/${name}`}
            key={name}
            className="inline-flex m-2 gap-1 items-center rounded-sm text-gray-900 duration-150 cursor-pointer outline outline-2 outline-offset-2 outline-transparent hover:outline-amber-100 focus:outline-amber-100 active:scale-95 active:opacity-70 select-none"
          >
            <p className="text-bold">#{capitalize(name)}</p>
            <span className="text-xs text-gray-500">{amount}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
