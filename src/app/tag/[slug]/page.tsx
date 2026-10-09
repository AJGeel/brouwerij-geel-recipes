import { Metadata } from "next";

import BackToRecipes from "@/components/BackToRecipes";
import RecipeCard from "@/components/RecipeCard";
import Reveal from "@/components/Reveal";
import PageTransition from "@/components/transitions/PageTransition";
import {
  filterRecipes,
  generateTags,
  scanAllRecipes,
} from "@/services/markdown";
import { capitalize } from "@/utils/capitalize";

import { Header } from "./Header";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const recipes = await getRecipesWithTag(slug);
  const decodedSlug = decodeURIComponent(slug);

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
  const { slug } = await params;
  const recipes = await getRecipesWithTag(slug);

  return (
    <PageTransition>
      <div className="mx-auto w-full max-w-7xl p-5 sm:p-8">
        <Reveal index={0}>
          <Header title={capitalize(decodeURIComponent(slug))} />
        </Reveal>
        <div className="mt-16 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map(({ slug, metadata }, index) => (
            <Reveal key={slug} index={index + 1} total={recipes.length + 1}>
              <RecipeCard
                slug={slug}
                title={metadata.title}
                durationString={metadata.duration}
                imageSlug={metadata.imageSlug}
              />
            </Reveal>
          ))}
          <Reveal index={recipes.length + 1} total={recipes.length + 1}>
            <BackToRecipes />
          </Reveal>
        </div>
      </div>
    </PageTransition>
  );
};

export default Page;
