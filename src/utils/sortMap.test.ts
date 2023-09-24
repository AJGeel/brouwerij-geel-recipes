import { describe, it, expect } from "bun:test";
import { sortMap } from "./sortMap";

describe("sortMap", () => {
  it("should sort a map by number and then by string", () => {
    const unsortedMap = new Map<string, number>();
    unsortedMap.set("banana", 2);
    unsortedMap.set("apple", 3);
    unsortedMap.set("date", 1);

    const sortedMap = sortMap(unsortedMap);

    const expectedSortedKeys = ["apple", "banana", "date"];
    const expectedSortedValues = [3, 2, 1];

    expect(Array.from(sortedMap.keys())).toEqual(expectedSortedKeys);
    expect(Array.from(sortedMap.values())).toEqual(expectedSortedValues);
  });

  it("should handle maps with equal numbers and different strings", () => {
    const unsortedMap = new Map<string, number>();
    unsortedMap.set("cherry", 2);
    unsortedMap.set("date", 1);
    unsortedMap.set("apple", 2);

    const sortedMap = sortMap(unsortedMap);

    const expectedSortedKeys = ["apple", "cherry", "date"];
    const expectedSortedValues = [2, 2, 1];

    expect(Array.from(sortedMap.keys())).toEqual(expectedSortedKeys);
    expect(Array.from(sortedMap.values())).toEqual(expectedSortedValues);
  });

  it("should handle an empty map", () => {
    const unsortedMap = new Map<string, number>();

    const sortedMap = sortMap(unsortedMap);

    expect(Array.from(sortedMap.keys())).toEqual([]);
    expect(Array.from(sortedMap.values())).toEqual([]);
  });
});
