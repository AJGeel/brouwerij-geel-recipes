import fs from "fs";

import md from "markdown-it";
import type { Metadata } from "next";
import { Recipe, WithContext } from "schema-dts";

import Header from "@/app/recept/[slug]/components/Header";
import Hero from "@/app/recept/[slug]/components/Hero";
import Ingredient from "@/app/recept/[slug]/components/Ingredient";
import { recipeDirectory } from "@/config";
import { parseRecipe } from "@/services/markdown";
import { createRecipeDescription } from "@/services/markdown/createRecipeDescription";

import Tags from "./components/Tags";

type Props = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { metadata, content } = await getRecipeContents(params.slug);

  return {
    title: `Recept: ${metadata.title}`,
    description: createRecipeDescription(content),
    keywords: [
      ...["Brouwerij Geel", "Recept"],
      ...metadata.ingredients.map((item) => item.name),
    ],
    openGraph: {
      images: metadata.imageSlug,
    },
  };
};

export const generateStaticParams = async () => {
  const files = fs.readdirSync(recipeDirectory);

  return files.map((fileName) => ({
    slug: fileName.replace(".md", ""),
  }));
};

const getRecipeContents = async (slug: string) => {
  const fileName = fs.readFileSync(`${recipeDirectory}/${slug}.md`, "utf-8");
  const parsedRecipe = parseRecipe(fileName);

  if (!parsedRecipe) {
    throw new Error("Failed to fetch data");
  }

  return parsedRecipe;
};

const Page = async ({ params }: Props) => {
  const { metadata, content } = await getRecipeContents(params.slug);

  const jsonLd: WithContext<Recipe> = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: metadata.title,
    image: metadata.imageSlug,
    keywords: metadata.tags,
    recipeIngredient: metadata.ingredients.map((item) =>
      String(`${item.amount} ${item.name}`)
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header name={metadata.title} />
      <div className="mx-auto max-w-3xl">
        <Hero imageSlug={metadata.imageSlug} title={metadata.title} />
        <div className="flex flex-col-reverse px-6 md:flex-row md:space-x-12">
          <div>
            <h2 className="text-lg font-medium">Bereiding</h2>
            <div
              className="prose mt-4 text-gray-600"
              dangerouslySetInnerHTML={{ __html: md().render(content) }}
            />
            <Tags tags={metadata.tags} />
          </div>
          <div className="mb-16 shrink-0 md:mb-0 md:w-64">
            <h2 className="text-lg font-medium">Ingrediënten</h2>
            <div className="mt-4 space-y-1.5">
              {metadata.ingredients.map(({ name, imageSlug, amount }) => (
                <Ingredient
                  key={name}
                  name={name}
                  imageSlug={imageSlug}
                  amount={amount}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
