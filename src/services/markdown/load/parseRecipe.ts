import matter from "gray-matter";

import { recipeMetadataSchema } from "./recipeSchema";

export class InvalidRecipeError extends Error {
  constructor(
    readonly source: string,
    readonly problems: string[],
  ) {
    super(`Invalid recipe '${source}':\n${problems.join("\n")}`);
  }
}

export const parseRecipe = (file: string, source: string) => {
  const { data, content } = matter(file);
  const result = recipeMetadataSchema.safeParse(data);

  if (!result.success) {
    const problems = result.error.issues.map(
      ({ path, message }) => `  - ${path.join(".") || "(recipe)"}: ${message}`,
    );

    throw new InvalidRecipeError(source, problems);
  }

  return { metadata: result.data, content };
};
