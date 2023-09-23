import RecipeCard from "@/components/RecipeCard";
import { filterRecipes, scanAllRecipes } from "@/services/markdown";
import { capitalize } from "@/utils/capitalize";
import Link from "next/link";

const getRecipesWithTag = async (tag: string) => {
  const allRecipes = scanAllRecipes();
  const filteredRecipes = filterRecipes(allRecipes, tag);

  if (!filteredRecipes || filteredRecipes.length === 0) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return filteredRecipes;
};

type Props = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: Props) => {
  const recipes = await getRecipesWithTag(decodeURIComponent(params.slug));

  return (
    <div className="max-w-7xl w-full mx-auto p-5 sm:p-8">
      <div className="flex flex-col items-center mt-9">
        <p className="text-gray-500">Je bekijkt:</p>
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          #{capitalize(decodeURIComponent(params.slug))}
        </h1>
      </div>
      <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16">
        {recipes.map(({ slug, metadata }) => (
          <RecipeCard
            key={slug}
            slug={slug}
            title={metadata.title}
            time={metadata.time}
            imageSlug={metadata.imageSlug}
          />
        ))}
        <Link
          href="/"
          className="bg-white border-2 border-amber-100 rounded-md h-48 md:h-64 flex items-center justify-center active:scale-95 active:opacity-75 duration-150 ease-in-out group"
        >
          <p className="group-hover:scale-105 duration-1000 text-gray-400">
            Terug naar alle recepten
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Page;
