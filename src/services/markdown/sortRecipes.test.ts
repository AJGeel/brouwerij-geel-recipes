import { describe, expect, it } from "bun:test";

import { isSortMode, parseSortMode, sortRecipes } from "./sortRecipes";

const recipe = (title: string, duration: string) => ({
  metadata: { title, duration },
});

const recipes = [
  recipe("Wentelteefjes", "P0Y0M0DT1H0M0S"),
  recipe("Omelet", "P0Y0M0DT0H15M0S"),
  recipe("Lamsschenkel", "P0Y0M0DT3H0M0S"),
  recipe("Cocktail", "P0Y0M0DT0H15M0S"),
];
const titles = (sorted: typeof recipes) => sorted.map((r) => r.metadata.title);

describe("sortRecipes", () => {
  it("keeps the given order by default", () => {
    expect(sortRecipes(recipes, "willekeurig")).toBe(recipes);
  });

  it("sorts alphabetically without mutating the input", () => {
    expect(titles(sortRecipes(recipes, "titel"))).toEqual([
      "Cocktail",
      "Lamsschenkel",
      "Omelet",
      "Wentelteefjes",
    ]);
    expect(titles(recipes)[0]).toBe("Wentelteefjes");
  });

  it("sorts by duration, shortest first, then by title", () => {
    expect(titles(sortRecipes(recipes, "tijd"))).toEqual([
      "Cocktail",
      "Omelet",
      "Wentelteefjes",
      "Lamsschenkel",
    ]);
  });
});

describe("isSortMode", () => {
  it("only accepts known modes", () => {
    expect(isSortMode("titel")).toBe(true);
    expect(isSortMode("nope")).toBe(false);
    expect(isSortMode(null)).toBe(false);
  });
});

describe("parseSortMode", () => {
  it("accepts known modes", () => {
    expect(parseSortMode("tijd")).toBe("tijd");
  });

  it("falls back to the default for anything else", () => {
    expect(parseSortMode("nope")).toBe("willekeurig");
    expect(parseSortMode(null)).toBe("willekeurig");
  });
});
