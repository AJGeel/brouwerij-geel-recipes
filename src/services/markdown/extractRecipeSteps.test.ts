import { describe, expect, it } from "bun:test";

import { extractRecipeSteps } from "./extractRecipeSteps";

describe("extractRecipeSteps", () => {
  it("strips the numbering and markup", () => {
    expect(
      extractRecipeSteps("**1.** Klop de *eieren* los.\n\n**2.** Bak de spek."),
    ).toEqual(["Klop de eieren los.", "Bak de spek."]);
  });

  it("keeps unnumbered paragraphs and list items", () => {
    expect(extractRecipeSteps("- a\n- b\n\nEet smakelijk!")).toEqual([
      "a",
      "b",
      "Eet smakelijk!",
    ]);
  });

  it("joins soft line breaks with a space", () => {
    expect(extractRecipeSteps("Eén\nTwee")).toEqual(["Eén Twee"]);
  });

  it("returns nothing for empty content", () => {
    expect(extractRecipeSteps("")).toEqual([]);
  });
});
