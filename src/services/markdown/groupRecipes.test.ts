import { describe, expect, it } from "bun:test";

import { groupRecipes } from "./groupRecipes";

const taxonomy = {
  beers: ["Porter", "Kriek"],
  mealTypes: {
    Diner: ["Diner"],
    Dessert: ["Dessert"],
    Cocktail: ["Cocktails"],
  },
};

const recipe = (slug: string, ingredients: string[], tags: string[]) => ({
  slug,
  metadata: {
    ingredients: ingredients.map((name) => ({
      name,
      amount: "",
      imageSlug: "",
    })),
    tags,
  },
});

const recipes = [
  recipe("lam", ["Porter", "Uien"], ["Eten", "Diner"]),
  recipe("ijs", ["Porter", "Melk"], ["Dessert"]),
  recipe("mojito", ["Kriek", "Munt"], ["Cocktails"]),
  recipe("water", ["Water"], ["Eten"]),
];

describe("groupRecipes", () => {
  it("groups by beer, biggest group first, ignoring other ingredients", () => {
    expect(groupRecipes(recipes, "bier", taxonomy)).toEqual([
      { name: "Porter", slugs: ["lam", "ijs"] },
      { name: "Kriek", slugs: ["mojito"] },
      { name: "Overig", slugs: ["water"] },
    ]);
  });

  it("groups by meal type in taxonomy order, leaving out empty groups", () => {
    const withoutDessert = recipes.filter(({ slug }) => slug !== "ijs");

    expect(groupRecipes(withoutDessert, "maaltijd", taxonomy)).toEqual([
      { name: "Diner", slugs: ["lam"] },
      { name: "Cocktail", slugs: ["mojito"] },
      { name: "Overig", slugs: ["water"] },
    ]);
  });

  it("puts a recipe in every group it matches", () => {
    const both = [recipe("x", ["Porter", "Kriek"], ["Diner", "Dessert"])];

    expect(groupRecipes(both, "bier", taxonomy).map((g) => g.name)).toEqual([
      "Kriek",
      "Porter",
    ]);
    expect(groupRecipes(both, "maaltijd", taxonomy).map((g) => g.name)).toEqual(
      ["Diner", "Dessert"],
    );
  });

  it("has no 'Overig' group when every recipe matches", () => {
    expect(groupRecipes(recipes.slice(0, 3), "bier", taxonomy)).toHaveLength(2);
  });
});
