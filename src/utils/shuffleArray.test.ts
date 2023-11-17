import { describe, it, expect } from "bun:test";

import { shuffleArray } from "./shuffleArray";

describe("shuffleArray", () => {
  it("should shuffle an array without losing any elements", () => {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray([...originalArray]);

    expect(shuffledArray).toHaveLength(originalArray.length);
    expect(shuffledArray).not.toEqual(originalArray);
  });

  it("should handle an empty array", () => {
    const result = shuffleArray([]);
    expect(result).toEqual([]);
  });

  it("should handle an array with a single element", () => {
    const result = shuffleArray([42]);
    expect(result).toEqual([42]);
  });

  it("should handle an array with repeated elements", () => {
    const originalArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
    const shuffledArray = shuffleArray([...originalArray]);

    expect(shuffledArray).toHaveLength(originalArray.length);
    expect(shuffledArray).not.toEqual(originalArray);
  });
});
