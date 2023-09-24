import fs from "fs";
import md from "markdown-it";

import Header from "@/app/recipe/[slug]/components/Header";
import Hero from "@/app/recipe/[slug]/components/Hero";
import Ingredient from "@/app/recipe/[slug]/components/Ingredient";
import { recipeDirectory } from "@/config/config";
import { parseRecipe } from "@/services/markdown";
import Tags from "./components/Tags";

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

type Props = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: Props) => {
  const { metadata, content } = await getRecipeContents(params.slug);

  return (
    <>
      <Header name={metadata.title} />
      <div className="max-w-3xl mx-auto">
        <Hero imageSlug={metadata.imageSlug} title={metadata.title} />
        <div className="flex flex-col-reverse md:flex-row md:space-x-12 px-6">
          <div>
            <h2 className="font-medium text-lg">Bereiding</h2>
            <div
              className="mt-4 text-gray-600 prose"
              dangerouslySetInnerHTML={{ __html: md().render(content) }}
            />
            <Tags tags={metadata.tags} />
          </div>
          <div className="md:w-64 mb-16 md:mb-0 flex-shrink-0">
            <h2 className="font-medium text-lg">Ingrediënten</h2>
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
