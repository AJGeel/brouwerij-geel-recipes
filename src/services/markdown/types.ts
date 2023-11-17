import { DurationString } from "@/utils/duration/types";

export interface Ingredient {
  name: string;
  amount: string;
  imageSlug: string;
}

export interface RecipeMetadata {
  title: string;
  imageSlug: string;
  ingredients: Ingredient[];
  duration: DurationString;
  tags: string[];
}

export type MarkdownRecipe = {
  slug: string;
  metadata: RecipeMetadata;
};
