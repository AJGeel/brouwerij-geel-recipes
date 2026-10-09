import RandomWord from "@/components/RandomWord";
import RecipeCard from "@/components/RecipeCard";
import Reveal from "@/components/Reveal";
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
          <h1 className="mt-8 max-w-lg text-3xl font-bold text-gray-900 md:text-4xl">
            Waar ga je je bier vandaag aan{" "}
            <RandomWord initialWord={initialRandomWord} />?
          </h1>
        </Reveal>
        <div className="mt-12 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map(({ slug, metadata }, index) => (
            <Reveal key={slug} index={index + 1} total={recipes.length}>
              <RecipeCard
                slug={slug}
                title={metadata.title}
                durationString={metadata.duration}
                imageSlug={metadata.imageSlug}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Page;
