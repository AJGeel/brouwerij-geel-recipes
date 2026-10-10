import fs from "fs";

import type { Metadata } from "next";

import Header from "@/app/recept/[slug]/components/Header";
import Hero from "@/app/recept/[slug]/components/Hero";
import Ingredient from "@/app/recept/[slug]/components/Ingredient";
import Step from "@/app/recept/[slug]/components/Step";
import Reveal from "@/components/Reveal";
import PageTransition from "@/components/transitions/PageTransition";
import { recipeDirectory } from "@/config";
import { parseRecipe, renderMarkdownBlocks } from "@/services/markdown";
import { createRecipeDescription } from "@/services/markdown/createRecipeDescription";
import { createRecipeJsonLd } from "@/services/seo/createRecipeJsonLd";

import Tags from "./components/Tags";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const { metadata, content } = await getRecipeContents(slug);

  return {
    title: `Recept: ${metadata.title}`,
    description: createRecipeDescription(content),
    keywords: [
      ...["Brouwerij Geel", "Recept"],
      ...metadata.ingredients.map((item) => item.name),
    ],
    alternates: { canonical: `/recept/${slug}` },
    // The image comes from opengraph-image.tsx
    openGraph: {
      type: "article",
      title: metadata.title,
      url: `/recept/${slug}`,
    },
    twitter: { card: "summary_large_image" },
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
  const { slug } = await params;
  const { metadata, content } = await getRecipeContents(slug);
  const preparationSteps = renderMarkdownBlocks(content);

  const jsonLd = createRecipeJsonLd({ slug, metadata, content });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTransition fadeIn>
        <Header name={metadata.title} />
      </PageTransition>
      <PageTransition>
        <div className="mx-auto max-w-7xl">
          <Hero
            slug={slug}
            imageSlug={metadata.imageSlug}
            title={metadata.title}
          />
          <div className="flex max-w-3xl flex-col-reverse px-6 md:flex-row md:space-x-12 md:px-2">
            <div>
              <Reveal index={0}>
                <h2 className="text-xl font-semibold">Bereiding</h2>
              </Reveal>
              <div className="prose mt-4 space-y-5 text-gray-600 dark:prose-invert">
                {preparationSteps.map((html, index) => (
                  <Reveal key={index} index={index + 1}>
                    <Step html={html} />
                  </Reveal>
                ))}
              </div>
              <Tags
                tags={metadata.tags}
                revealIndex={preparationSteps.length + 1}
              />
            </div>
            <div className="mb-16 shrink-0 md:mb-0 md:w-64">
              <Reveal index={1}>
                <h2 className="text-xl font-semibold">Ingrediënten</h2>
              </Reveal>
              <div className="mt-4 space-y-1.5">
                {metadata.ingredients.map(
                  ({ name, imageSlug, amount }, index) => (
                    <Reveal key={name} index={index + 2}>
                      <Ingredient
                        name={name}
                        imageSlug={imageSlug}
                        amount={amount}
                      />
                    </Reveal>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Page;
