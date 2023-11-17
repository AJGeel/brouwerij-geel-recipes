import { describe, expect, it } from "bun:test";

import { createRecipeDescription } from "./createRecipeDescription";

describe("createRecipeDescription", () => {
  it("should create a formatted recipe description with truncation", () => {
    const content =
      "This is a recipe description with some *special* formatting.";
    const result = createRecipeDescription(content);

    // Assuming truncateString is working correctly, you can check the length
    expect(result.length).toBeLessThanOrEqual(158);

    // Check if the formatted description starts with 'Bereiding:'
    expect(result.startsWith("Bereiding:")).toBe(true);

    // Check if the special characters are removed
    expect(result.includes("*")).toBe(false);
  });

  it("should handle an empty content string", () => {
    const result = createRecipeDescription("");
    expect(result).toEqual("Bereiding: ...");
  });

  it("should handle a long content string with truncation", () => {
    const longContent = "A".repeat(200); // Assuming truncateString works, this should be truncated
    const result = createRecipeDescription(longContent);

    expect(result.length).toBeLessThanOrEqual(158);
  });
});
