import { describe, it, expect } from "bun:test";

import { truncateString } from "./truncateString";

describe("truncateString", () => {
  it("should truncate a string when characters are positive", () => {
    const result = truncateString("Hello, World!", 5);
    expect(result).toEqual("Hello");
  });

  it("should return the entire string when characters are greater than the length of the string", () => {
    const result = truncateString("Hello, World!", 20);
    expect(result).toEqual("Hello, World!");
  });

  it("should return an empty string when characters are 0", () => {
    const result = truncateString("Hello, World!", 0);
    expect(result).toEqual("");
  });

  it("should handle empty input string", () => {
    const result = truncateString("", 5);
    expect(result).toEqual("");
  });

  it("should handle negative characters by returning an empty string", () => {
    const result = truncateString("Hello, World!", -5);
    expect(result).toEqual("");
  });
});
