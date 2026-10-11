import fs from "fs";

import { recipeDirectory } from "@/config";

import { InvalidRecipeError, parseRecipe } from "./parseRecipe";
import { reportInvalidRecipe } from "./reportInvalidRecipe";

export const readRecipe = (fileName: string, directory = recipeDirectory) => {
  try {
    return parseRecipe(
      fs.readFileSync(`${directory}/${fileName}`, "utf-8"),
      fileName,
    );
  } catch (error) {
    if (error instanceof InvalidRecipeError) {
      reportInvalidRecipe(error);
      return undefined;
    }

    throw error;
  }
};
