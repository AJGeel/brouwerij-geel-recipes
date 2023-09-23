import matter from "gray-matter";

import { RecipeMetadata } from "./types";

export const parseRecipe = (fileName: string) => {
  const { data: metadata, content } = matter(fileName);

  return {
    metadata,
    content,
  } as {
    metadata: RecipeMetadata;
    content: string;
  };
};
