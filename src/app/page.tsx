import RecipeCard from "@/components/RecipeCard";
import { scanAllRecipes } from "@/services/markdown";
import { randomWaste } from "@/services/ui/randomWaste";

const getRecipes = async () => {
  const allRecipes = scanAllRecipes();

  if (!allRecipes || allRecipes.length === 0) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return allRecipes;
};

const Page = async () => {
  const recipes = await getRecipes();
  const randomWord = randomWaste();

  return (
    <div className="max-w-7xl w-full mx-auto p-5 sm:p-8">
      <h1 className="text-3xl md:text-4xl mt-8 font-bold text-gray-900 max-w-lg">
        Waar ga je je bier vandaag aan {randomWord}?
      </h1>
      <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
        {recipes.map(({ slug, metadata }) => (
          <RecipeCard
            key={slug}
            slug={slug}
            title={metadata.title}
            time={metadata.time}
            imageSlug={metadata.imageSlug}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
