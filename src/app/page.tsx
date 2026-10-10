import RandomWord from "@/components/RandomWord";
import RecipeCard from "@/components/Recipe/RecipeCard";
import RecipeOverview from "@/components/RecipeOverview";
import Reveal from "@/components/Reveal";
import PageTransition from "@/components/transitions/PageTransition";
import { ViewOptions } from "@/components/ViewOptions/ViewOptions";
import { scanAllRecipes } from "@/services/markdown";
import { groupRecipes } from "@/services/markdown/groupRecipes";
import { createSearchText } from "@/services/markdown/searchRecipes";
import { loadTaxonomy } from "@/services/markdown/taxonomy";
import { getRandomWord } from "@/services/ui/getRandomWord";
import { formatDurationString } from "@/utils/duration/formatDurationString";

const getRecipes = async () => {
  const allRecipes = scanAllRecipes();

  if (!allRecipes || allRecipes.length === 0) {
    throw new Error("Failed to fetch data");
  }

  return allRecipes;
};

const Page = async () => {
  const recipes = await getRecipes();
  const initialRandomWord = getRandomWord();
  const taxonomy = loadTaxonomy();

  const createCards = (morph: boolean) =>
    Object.fromEntries(
      recipes.map(({ slug, metadata }) => [
        slug,
        <RecipeCard
          key={slug}
          slug={slug}
          title={metadata.title}
          durationString={metadata.duration}
          imageSlug={metadata.imageSlug}
          morph={morph}
        />,
      ]),
    );

  return (
    <PageTransition>
      <div className="mx-auto w-full max-w-7xl p-5 sm:p-8">
        <Reveal index={0}>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row md:items-start">
            <h1 className="max-w-lg text-center text-3xl font-bold text-gray-900 md:text-left md:text-4xl">
              Waar ga je je bier vandaag aan{" "}
              <RandomWord initialWord={initialRandomWord} />?
            </h1>
            <ViewOptions />
          </div>
        </Reveal>
        <RecipeOverview
          groups={{
            bier: groupRecipes(recipes, "bier", taxonomy),
            maaltijd: groupRecipes(recipes, "maaltijd", taxonomy),
          }}
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
          cards={createCards(true)}
          repeatedCards={createCards(false)}
        />
      </div>
    </PageTransition>
  );
};

export default Page;
