import RandomWord from "@/components/RandomWord";
import RecipeCard from "@/components/RecipeCard";
import Reveal from "@/components/Reveal";
import SortButton from "@/components/SortButton";
import SortedRecipeGrid from "@/components/SortedRecipeGrid";
import PageTransition from "@/components/transitions/PageTransition";
import { scanAllRecipes } from "@/services/markdown";
import { getRandomWord } from "@/services/ui/getRandomWord";

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
  const initialRandomWord = getRandomWord();

  return (
    <PageTransition>
      <div className="mx-auto w-full max-w-7xl p-5 sm:p-8">
        <Reveal index={0}>
          <div className="mt-8 flex items-start justify-between gap-4">
            <h1 className="max-w-lg text-3xl font-bold text-gray-900 md:text-4xl">
              Waar ga je je bier vandaag aan{" "}
              <RandomWord initialWord={initialRandomWord} />?
            </h1>
            <SortButton />
          </div>
        </Reveal>
        <SortedRecipeGrid
          recipes={recipes.map(({ slug, metadata }) => ({
            slug,
            metadata: { title: metadata.title, duration: metadata.duration },
          }))}
          cards={Object.fromEntries(
            recipes.map(({ slug, metadata }) => [
              slug,
              <RecipeCard
                key={slug}
                slug={slug}
                title={metadata.title}
                durationString={metadata.duration}
                imageSlug={metadata.imageSlug}
              />,
            ]),
          )}
        />
      </div>
    </PageTransition>
  );
};

export default Page;
