import RandomWord from "@/components/RandomWord";
import RecipeCard from "@/components/Recipe/RecipeCard";
import RecipeOverview from "@/components/RecipeOverview";
import Reveal from "@/components/Reveal";
import PageTransition from "@/components/transitions/PageTransition";
import { ViewOptions } from "@/components/ViewOptions/ViewOptions";
import { scanAllRecipes } from "@/services/markdown";
import { createSearchText } from "@/services/markdown/searchRecipes";
import { getRandomWord } from "@/services/ui/getRandomWord";
import { formatDurationString } from "@/utils/duration/formatDurationString";

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
          <div className="mt-8 flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
            <h1 className="max-w-lg text-3xl font-bold text-gray-900 md:text-4xl">
              Waar ga je je bier vandaag aan{" "}
              <RandomWord initialWord={initialRandomWord} />?
            </h1>
            <ViewOptions />
          </div>
        </Reveal>
        <RecipeOverview
          recipes={recipes.map(({ slug, metadata }) => ({
            slug,
            metadata: {
              title: metadata.title,
              duration: metadata.duration,
              imageSlug: metadata.imageSlug,
            },
            durationLabel: formatDurationString(metadata.duration),
            searchText: createSearchText(metadata),
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
