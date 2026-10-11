import type { z } from "zod";

import type {
  ingredientSchema,
  recipeMetadataSchema,
} from "./load/recipeSchema";

export type Ingredient = z.infer<typeof ingredientSchema>;

export type RecipeMetadata = z.infer<typeof recipeMetadataSchema>;

export type MarkdownRecipe = {
  slug: string;
  metadata: RecipeMetadata;
};
