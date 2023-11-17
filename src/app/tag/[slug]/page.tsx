import RecipeCard from "@/components/RecipeCard";
import {
  filterRecipes,
  generateTags,
  scanAllRecipes,
} from "@/services/markdown";
import { capitalize } from "@/utils/capitalize";
import Link from "next/link";
import { Header } from "./Header";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const recipes = await getRecipesWithTag(params.slug);
  const decodedSlug = decodeURIComponent(params.slug);

  return {
    title: `Recepten met '${decodedSlug}': ${recipes.length}`,
    description: `Vind recepten met ${decodedSlug} bij Brouwerij Geel`,
    keywords: [
      ...["Brouwerij Geel", "Recept", decodedSlug],
      ...recipes.map((item) => item.metadata.title),
    ],
  };
};

export const generateStaticParams = async () => {
  const allRecipes = scanAllRecipes();
  const tagsWithCount = generateTags(allRecipes);
  const tags = Array.from(tagsWithCount.keys());

  return tags.map((tag) => ({
    slug: tag,
  }));
};

const getRecipesWithTag = async (tag: string) => {
  const allRecipes = scanAllRecipes();
  const filteredRecipes = filterRecipes(allRecipes, decodeURIComponent(tag));

  if (!filteredRecipes || filteredRecipes.length === 0) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return filteredRecipes;
};

const Page = async ({ params }: Props) => {
  const recipes = await getRecipesWithTag(params.slug);

  return (
    <div className="max-w-7xl w-full mx-auto p-5 sm:p-8">
      <Header title={capitalize(decodeURIComponent(params.slug))} />
      <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16">
        {recipes.map(({ slug, metadata }) => (
          <RecipeCard
            key={slug}
            slug={slug}
            title={metadata.title}
            durationString={metadata.duration}
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
