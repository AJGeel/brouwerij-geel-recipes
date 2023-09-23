import { describe, it, expect } from "bun:test";
import { capitalize } from "./capitalize";

describe("capitalize function", () => {
  it("should capitalize the first letter of a word", () => {
    const input = "hello";
    const result = capitalize(input);
    expect(result).toBe("Hello");
  });

  it("should not change the capitalization of the first letter if it is already capitalized", () => {
    const input = "World";
    const result = capitalize(input);
    expect(result).toBe("World");
  });

  it("should handle empty strings", () => {
    const input = "";
    const result = capitalize(input);
    expect(result).toBe("");
  });

  it("should handle strings with only one character", () => {
    const input = "a";
    const result = capitalize(input);
    expect(result).toBe("A");
  });

  it("should handle strings with leading spaces", () => {
    const input = "  example";
    const result = capitalize(input);
    expect(result).toBe("  example");
  });

  it("should handle strings with special characters", () => {
    const input = "@test";
    const result = capitalize(input);
    expect(result).toBe("@test");
  });
});
