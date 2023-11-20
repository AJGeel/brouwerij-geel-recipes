import { describe, it, expect } from "bun:test";

import { getRandomWord } from "./getRandomWord";

describe("getRandomWord", () => {
  it("should return a random word from the dictionary", () => {
    const result = getRandomWord();
    expect(dictionary).toContain(result);
  });

  it("should not return the current word if provided", () => {
    const currentWord = "verdoen";
    const result = getRandomWord(currentWord, dictionary);
    expect(result).not.toEqual(currentWord);
  });

  it("should return undefined if the dictionary is empty", () => {
    const result = getRandomWord(undefined, []);
    expect(result).toBeUndefined();
  });

  it("should handle a single-word dictionary", () => {
    const singleWordDictionary = ["unique"];
    const result = getRandomWord(undefined, singleWordDictionary);
    expect(result).toEqual("unique");
  });
});
