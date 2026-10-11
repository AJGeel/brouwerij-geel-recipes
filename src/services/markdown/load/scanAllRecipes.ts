import fs from "fs";

import { recipeDirectory } from "@/config";
import { shuffleArray } from "@/utils/shuffleArray";

import { readRecipe } from "./readRecipe";
import type { MarkdownRecipe } from "../types";

/** All valid recipes, in random order. Invalid ones are reported and left out */
export const scanAllRecipes = (directory = recipeDirectory) =>
  shuffleArray(fs.readdirSync(directory)).flatMap(
    (fileName): MarkdownRecipe[] => {
      const recipe = readRecipe(fileName, directory);

      return recipe
        ? [{ slug: fileName.replace(".md", ""), metadata: recipe.metadata }]
        : [];
    },
  );
