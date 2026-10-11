import fs from "fs";

import { recipeDirectory } from "@/config";

import { InvalidRecipeError, parseRecipe } from "./parseRecipe";
import { reportInvalidRecipe } from "./reportInvalidRecipe";

/** Throws an `InvalidRecipeError` for a recipe that doesn't validate */
export const readRecipeOrThrow = (
  fileName: string,
  directory = recipeDirectory,
) =>
  parseRecipe(fs.readFileSync(`${directory}/${fileName}`, "utf-8"), fileName);

export const readRecipe = (fileName: string, directory = recipeDirectory) => {
  try {
    return readRecipeOrThrow(fileName, directory);
  } catch (error) {
    if (error instanceof InvalidRecipeError) {
      reportInvalidRecipe(error);
      return undefined;
    }

    throw error;
  }
};
