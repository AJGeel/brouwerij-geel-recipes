import fs from "fs";

import matter from "gray-matter";

import { recipeDirectory } from "@/config/config";
import { shuffleArray } from "@/utils/shuffleArray";

import { MarkdownRecipe } from "./types";

export const scanAllRecipes = () => {
  const files = fs.readdirSync(recipeDirectory);
  const shuffledFiles = shuffleArray(files);

  const allRecipes = shuffledFiles.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const file = fs.readFileSync(`${recipeDirectory}/${fileName}`, "utf-8");

    const { data: metadata } = matter(file);

    return {
      slug,
      metadata,
    } as MarkdownRecipe;
  });

  return allRecipes;
};
