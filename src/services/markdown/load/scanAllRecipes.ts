import fs from "fs";

import { recipeDirectory } from "@/config";
import { shuffleArray } from "@/utils/shuffleArray";

import { readRecipe, readRecipeOrThrow } from "./readRecipe";
import type { MarkdownRecipe } from "../types";

type Options = {
  /** Throw on an invalid recipe instead of reporting and skipping it */
  strict?: boolean;
};

/** All valid recipes, in random order. Invalid ones are reported and left out */
export const scanAllRecipes = (
  directory = recipeDirectory,
  { strict = false }: Options = {},
) =>
  shuffleArray(fs.readdirSync(directory)).flatMap(
    (fileName): MarkdownRecipe[] => {
      const recipe = (strict ? readRecipeOrThrow : readRecipe)(
        fileName,
        directory,
      );

      return recipe
        ? [{ slug: fileName.replace(".md", ""), metadata: recipe.metadata }]
        : [];
    },
  );
