import { describe, expect, it } from "bun:test";

import { createRecipeDescription } from "./createRecipeDescription";

describe("createRecipeDescription", () => {
  it("should create a formatted recipe description with truncation", () => {
    const content =
      "This is a recipe description with some *special* formatting.";
    const result = createRecipeDescription(content);

    expect(result.length).toBeLessThanOrEqual(158);

    expect(result.startsWith("Bereiding:")).toBe(true);

    expect(result.includes("*")).toBe(false);
  });

  it("should strip step numbers and markup but keep the text intact", () => {
    const content = "**1.** Doe 120 ml bier in een pan.\n\n**2.** Roer 2 keer.";

    expect(createRecipeDescription(content)).toBe(
      "Bereiding: Doe 120 ml bier in een pan. Roer 2 keer....",
    );
  });

  it("should handle an empty content string", () => {
    const result = createRecipeDescription("");
    expect(result).toEqual("Bereiding: ...");
  });

  it("should handle a long content string with truncation", () => {
    const longContent = "A".repeat(200);
    const result = createRecipeDescription(longContent);

    expect(result.length).toBeLessThanOrEqual(158);
  });
});
