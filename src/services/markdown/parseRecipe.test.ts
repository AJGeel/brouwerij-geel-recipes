import fs from "fs";

import { describe, expect, it } from "bun:test";

import { parseRecipe } from ".";

describe("parseRecipe", () => {
  it("should return a parsed recipe if the contents are correct", () => {
    const validRecipe = fs.readFileSync(
      "./src/services/markdown/__fixtures__/valid-recipe.md",
      "utf-8"
    );

    expect(parseRecipe(validRecipe)).toBeDefined();
  });

  it("should return nothing if the recipe is broken or malformed", () => {
    const brokenRecipe = fs.readFileSync(
      "./src/services/markdown/__fixtures__/valid-recipe.md",
      "utf-8"
    );
    const huh = parseRecipe(brokenRecipe);

    console.log(huh);

    expect(huh).toBeUndefined();
  });
});
