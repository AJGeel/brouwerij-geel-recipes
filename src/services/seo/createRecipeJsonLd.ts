import type { Recipe, WithContext } from "schema-dts";

import { websiteUrl } from "@/config";
import { extractRecipeSteps } from "@/services/markdown/extractRecipeSteps";
import type { RecipeMetadata } from "@/services/markdown/types";

import { createRecipeDescription } from "../markdown/createRecipeDescription";

type Props = {
  slug: string;
  metadata: RecipeMetadata;
  content: string;
};

const absoluteUrl = (path: string) => new URL(path, websiteUrl).toString();

export const createRecipeJsonLd = ({
  slug,
  metadata,
  content,
}: Props): WithContext<Recipe> => {
  const url = absoluteUrl(`/recept/${slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "@id": url,
    url,
    name: metadata.title,
    description: createRecipeDescription(content),
    inLanguage: "nl",
    image: absoluteUrl(metadata.imageSlug),
    author: { "@type": "Person", name: "Arthur Geel" },
    publisher: {
      "@type": "Organization",
      name: "Brouwerij Geel",
      url: websiteUrl,
    },
    totalTime: metadata.duration,
    keywords: metadata.tags.join(", "),
    recipeCategory: metadata.tags,
    recipeIngredient: metadata.ingredients.map(
      (item) => `${item.amount} ${item.name}`,
    ),
    recipeInstructions: extractRecipeSteps(content).map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text,
    })),
  };
};
