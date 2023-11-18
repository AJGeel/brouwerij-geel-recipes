import { Metadata } from "next";
import Link from "next/link";

import { generateTags, scanAllRecipes } from "@/services/markdown";
import { capitalize } from "@/utils/capitalize";

const getTagsAndRecipes = async () => {
  const allRecipes = scanAllRecipes();
  const allTags = generateTags(allRecipes);

  return { tags: allTags, numRecipes: allRecipes.length };
};

export const generateMetadata = async (): Promise<Metadata> => {
  const { tags, numRecipes } = await getTagsAndRecipes();

  return {
    title: `Vind recepten met via tags`,
    description: `Brouwerij Geel heeft ${numRecipes} recepten met ${
      Array.from(tags).length
    } tags`,
    keywords: [...["Brouwerij Geel", "Recepten"], ...Array.from(tags.keys())],
  };
};

const Page = async () => {
  const { tags } = await getTagsAndRecipes();
  const iterableTags = Array.from(tags);

  return (
    <div className="mx-auto w-full max-w-7xl p-5 sm:p-8">
      <h1 className="mt-8 max-w-lg text-3xl font-bold text-gray-900 md:text-4xl">
        Brouwerij Geel heeft recepten in thema:
      </h1>
      <div className="-m-2 mt-4">
        {iterableTags.map(([name, amount]) => (
          <Link
            href={`/tag/${name}`}
            key={name}
            className="m-2 inline-flex cursor-pointer select-none items-center gap-1 rounded-sm text-gray-900 outline outline-2 outline-offset-2 outline-transparent duration-150 hover:outline-amber-100 focus:outline-amber-100 active:scale-95 active:opacity-70"
          >
            <p className="font-bold">#{capitalize(name)}</p>
            <span className="text-xs text-gray-500">{amount}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
