import { describe, expect, it } from "bun:test";

import { filterRecipes } from "./filterRecipes";
import { MarkdownRecipe } from "./types";

const fixtures: MarkdownRecipe[] = [
  {
    slug: "recipe1",
    metadata: {
      title: "Recipe 1",
      imageSlug: "recipe1-image",
      ingredients: [
        {
          name: "Ingredient1",
          amount: "1 cup",
          imageSlug: "ingredient1-image",
        },
        {
          name: "Ingredient2",
          amount: "2 cups",
          imageSlug: "ingredient2-image",
        },
      ],
      duration: "P0Y0M0DT0H15M0S",
      tags: ["Tag1", "Tag2"],
    },
  },
  {
    slug: "recipe2",
    metadata: {
      title: "Recipe 2",
      imageSlug: "recipe2-image",
      ingredients: [
        {
          name: "Ingredient3",
          amount: "3 cups",
          imageSlug: "ingredient3-image",
        },
        {
          name: "Ingredient4",
          amount: "4 cups",
          imageSlug: "ingredient4-image",
        },
      ],
      duration: "P0Y0M0DT0H5M0S",
      tags: ["Tag2", "Tag3"],
    },
  },
];

describe("filterRecipes", () => {
  it("should filter recipes by ingredient name", () => {
    const filteredRecipes = filterRecipes(fixtures, "Ingredient1");
    expect(filteredRecipes).toHaveLength(1);
    expect(filteredRecipes[0].metadata.ingredients[0]).toEqual({
      name: "Ingredient1",
      amount: "1 cup",
      imageSlug: "ingredient1-image",
    });
  });

  it("should filter recipes by tag", () => {
    const filteredRecipes = filterRecipes(fixtures, "Tag1");
    expect(filteredRecipes).toHaveLength(1);
    expect(filteredRecipes[0].metadata.tags).toContain("Tag1");
  });

  it("should return an empty array if no matches are found", () => {
    const filteredRecipes = filterRecipes(fixtures, "NonExistentTag");
    expect(filteredRecipes).toHaveLength(0);
  });
});
