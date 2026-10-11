import { describe, expect, it } from "bun:test";

import { createSearchText, searchRecipes } from "./searchRecipes";

const recipes = [
  {
    title: "Omelet met bruin bier, champignons en spek",
    ingredients: ["Bruin bier", "Eieren", "Spek"],
    tags: ["Eten", "Brunch"],
  },
  {
    title: "Ginger Island",
    ingredients: ["Gember", "Limoen"],
    tags: ["Cocktails"],
  },
].map(({ title, ingredients, tags }) => ({
  title,
  searchText: createSearchText({
    title,
    ingredients: ingredients.map((name) => ({
      name,
      amount: "",
      imageSlug: "",
    })),
    tags,
  }),
}));
const titles = (query: string) =>
  searchRecipes(recipes, query).map(({ title }) => title);

describe("searchRecipes", () => {
  it("returns everything for an empty query", () => {
    expect(searchRecipes(recipes, "")).toBe(recipes);
    expect(searchRecipes(recipes, "   ")).toBe(recipes);
  });

  it("finds by title, ingredient and tag", () => {
    expect(titles("island")).toEqual(["Ginger Island"]);
    expect(titles("eieren")).toEqual([recipes[0].title]);
    expect(titles("cocktails")).toEqual(["Ginger Island"]);
  });

  it("ignores case and accents", () => {
    expect(titles("LIMOEN")).toEqual(["Ginger Island"]);
    expect(titles("ingrediënt")).toEqual([]);
    expect(titles("gémber")).toEqual(["Ginger Island"]);
  });

  it("needs every word to match", () => {
    expect(titles("bruin spek")).toEqual([recipes[0].title]);
    expect(titles("bruin gember")).toEqual([]);
  });
});
