import fs from "fs";

import { describe, expect, it } from "bun:test";

import { recipeDirectory } from "@/config";

import { scanAllRecipes } from "./scanAllRecipes";

describe("scanAllRecipes", () => {
  const files = fs.readdirSync(recipeDirectory);
  const recipes = scanAllRecipes();

  it("reads and validates every recipe file", () => {
    expect(recipes).toHaveLength(files.length);
  });

  it("gives every recipe a unique slug that matches its file", () => {
    const slugs = recipes.map(({ slug }) => slug).sort();

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toEqual(files.map((file) => file.replace(".md", "")).sort());
  });

  it("points every recipe and ingredient at an image that exists", () => {
    const images = recipes.flatMap(({ metadata }) => [
      metadata.imageSlug,
      ...metadata.ingredients.map(({ imageSlug }) => imageSlug),
    ]);
    const missing = images.filter(
      (image) => !fs.existsSync(`./public${image}`),
    );

    expect(missing).toEqual([]);
  });
});
