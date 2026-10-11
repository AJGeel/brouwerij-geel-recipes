import { recipeDirectory } from "@/config";

import type { InvalidRecipeError } from "./parseRecipe";

const reported = new Set<string>();

const escapeAnnotation = (text: string) =>
  text.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");

export const reportInvalidRecipe = (error: InvalidRecipeError) => {
  if (reported.has(error.source)) {
    return;
  }

  reported.add(error.source);
  console.warn(`${error.message}\n  Skipping this recipe.`);

  if (process.env.GITHUB_ACTIONS) {
    const file = `${recipeDirectory.replace(/^\.\//, "")}/${error.source}`;
    const message = escapeAnnotation(
      `Skipped, fix these problems:\n${error.problems.join("\n")}`,
    );

    process.stdout.write(
      `::warning file=${file},title=Invalid recipe::${message}\n`,
    );
  }
};
