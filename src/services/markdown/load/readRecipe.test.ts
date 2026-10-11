import fs from "fs";
import os from "os";
import path from "path";

import { afterAll, beforeAll, describe, expect, it, spyOn } from "bun:test";

import { readRecipe } from "./readRecipe";
import { scanAllRecipes } from "./scanAllRecipes";

const validRecipe = `---
title: Goed recept
imageSlug: /images/recipes/goed.jpg
ingredients:
  - name: Bier
    amount: 1 fles
    imageSlug: /images/ingredients/bier.png
duration: PT10M
tags: []
---

**1.** Drink.
`;

const invalidRecipe = validRecipe.replace("PT10M", "tien minuten");

let directory: string;

beforeAll(() => {
  directory = fs.mkdtempSync(path.join(os.tmpdir(), "recipes-"));
  fs.writeFileSync(path.join(directory, "goed.md"), validRecipe);
  fs.writeFileSync(path.join(directory, "kapot.md"), invalidRecipe);
  fs.writeFileSync(path.join(directory, "ook-goed.md"), validRecipe);
});

afterAll(() => {
  fs.rmSync(directory, { recursive: true, force: true });
});

describe("readRecipe", () => {
  it("returns a valid recipe", () => {
    expect(readRecipe("goed.md", directory)?.metadata.title).toBe(
      "Goed recept",
    );
  });

  it("returns undefined for an invalid recipe, and reports it", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {});

    expect(readRecipe("kapot.md", directory)).toBeUndefined();
    expect(warn.mock.calls.flat().join("")).toContain("kapot.md");

    warn.mockRestore();
  });

  it("still throws when the file can't be read", () => {
    expect(() => readRecipe("bestaat-niet.md", directory)).toThrow("ENOENT");
  });
});

describe("scanAllRecipes with an invalid recipe", () => {
  it("leaves the invalid recipe out and keeps the others", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {});

    const slugs = scanAllRecipes(directory)
      .map(({ slug }) => slug)
      .sort();

    expect(slugs).toEqual(["goed", "ook-goed"]);

    warn.mockRestore();
  });
});
