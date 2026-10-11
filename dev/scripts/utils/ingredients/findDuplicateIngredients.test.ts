import { describe, expect, it } from "bun:test";

import {
  findDuplicateIngredients,
  normalizeIngredientName,
} from "./findDuplicateIngredients";
import { recipe as createRecipe } from "./testUtils";

const recipe = (...ingredients: [string, string][]) =>
  createRecipe("recipe", ...ingredients);

describe("normalizeIngredientName", () => {
  it.each([
    ["Uien", "ui"],
    ["Ui", "ui"],
    ["Tomaten", "tomat"],
    ["Tomaat", "tomat"],
    ["Champignons", "champignon"],
    ["Laurierblaadjes", "laurierbladje"],
    ["Brood (snee)", "brod"],
    ["Crème fraîche", "cremefraiche"],
  ])("normalizes %s", (name, expected) => {
    expect(normalizeIngredientName(name)).toBe(expected);
  });

  it("leaves short names intact", () => {
    expect(normalizeIngredientName("Gin")).toBe("gin");
    expect(normalizeIngredientName("Rum")).toBe("rum");
    expect(normalizeIngredientName("IJs")).toBe("ijs");
  });
});

describe("findDuplicateIngredients", () => {
  it("finds different names that share a thumbnail", () => {
    const groups = findDuplicateIngredients([
      recipe(["Rum", "/rum.png"], ["Witte Rum", "/rum.png"]),
    ]);

    expect(groups).toEqual([
      { names: ["Rum", "Witte Rum"], reasons: ["same-thumbnail"] },
    ]);
  });

  it("finds plural and casing variants across recipes", () => {
    const groups = findDuplicateIngredients([
      recipe(["Uien", "/ui.png"]),
      recipe(["ui", "/ui-2.png"]),
    ]);

    expect(groups).toEqual([
      { names: ["ui", "Uien"], reasons: ["similar-name"] },
    ]);
  });

  it("reports a pair once when both signals match", () => {
    const groups = findDuplicateIngredients([
      recipe(["Tomaat", "/tomaat.png"], ["Tomaten", "/tomaat.png"]),
    ]);

    expect(groups).toEqual([
      {
        names: ["Tomaat", "Tomaten"],
        reasons: ["same-thumbnail", "similar-name"],
      },
    ]);
  });

  it("ignores the same ingredient used in several recipes", () => {
    expect(
      findDuplicateIngredients([
        recipe(["Limoen", "/limoen.png"]),
        recipe(["Limoen", "/limoen.png"]),
      ]),
    ).toEqual([]);
  });

  it("does not match unrelated beers", () => {
    expect(
      findDuplicateIngredients([
        recipe(
          ["Witbier", "/a.png"],
          ["Bruin bier", "/b.png"],
          ["Gin", "/c.png"],
        ),
      ]),
    ).toEqual([]);
  });
});
