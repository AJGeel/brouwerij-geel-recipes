import { recipeDirectory } from "@/config";
import { githubAnnotation } from "@/utils/githubAnnotation";

import type { InvalidRecipeError } from "./parseRecipe";

const reported = new Set<string>();

export const reportInvalidRecipe = (error: InvalidRecipeError) => {
  if (reported.has(error.source)) {
    return;
  }

  reported.add(error.source);
  console.warn(`${error.message}\n  Skipping this recipe.`);

  githubAnnotation(
    "warning",
    {
      title: "Invalid recipe",
      file: `${recipeDirectory.replace(/^\.\//, "")}/${error.source}`,
    },
    `Skipped, fix these problems:\n${error.problems.join("\n")}`,
  );
};
