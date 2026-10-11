import type { MarkdownRecipe } from "@/services/markdown/types";

export const recipe = (
  slug: string,
  ...ingredients: [name: string, imageSlug: string][]
): MarkdownRecipe => ({
  slug,
  metadata: {
    title: slug,
    imageSlug: `/images/recipes/${slug}.jpg`,
    duration: "PT5M",
    tags: [],
    ingredients: ingredients.map(([name, imageSlug]) => ({
      name,
      imageSlug,
      amount: "1×",
    })),
  },
});
