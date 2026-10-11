import { describe, expect, it } from "bun:test";

import { parseRecipe } from "./parseRecipe";

const recipeFile = (frontMatter: string, body = "**1.** Roer.") =>
  `---\n${frontMatter}\n---\n\n${body}`;

const validFrontMatter = `title: Mojito met Kriek
imageSlug: /images/recipes/mojito-met-kriek.jpg
ingredients:
  - name: Kriek
    amount: 60 ml
    imageSlug: /images/ingredients/kriek.png
duration: P0Y0M0DT0H5M0S
tags:
  - Cocktails`;

const without = (field: string) =>
  validFrontMatter
    .split(/\n(?=\S)/)
    .filter((block) => !block.startsWith(`${field}:`))
    .join("\n");

const parseError = (frontMatter: string) => {
  try {
    parseRecipe(recipeFile(frontMatter), "mojito.md");
  } catch (error) {
    return (error as Error).message;
  }

  return "";
};

describe("parseRecipe", () => {
  it("returns typed metadata and the body", () => {
    const { metadata, content } = parseRecipe(
      recipeFile(validFrontMatter),
      "mojito.md",
    );

    expect(metadata).toEqual({
      title: "Mojito met Kriek",
      imageSlug: "/images/recipes/mojito-met-kriek.jpg",
      ingredients: [
        {
          name: "Kriek",
          amount: "60 ml",
          imageSlug: "/images/ingredients/kriek.png",
        },
      ],
      duration: "P0Y0M0DT0H5M0S",
      tags: ["Cocktails"],
    });
    expect(content.trim()).toBe("**1.** Roer.");
  });

  it("accepts a short ISO duration and a recipe without tags", () => {
    const frontMatter = validFrontMatter
      .replace("P0Y0M0DT0H5M0S", "PT50M")
      .replace("  - Cocktails", "")
      .replace("tags:", "tags: []");

    expect(parseRecipe(recipeFile(frontMatter), "x.md").metadata).toMatchObject(
      { duration: "PT50M", tags: [] },
    );
  });

  it("turns a numeric amount into a string", () => {
    const frontMatter = validFrontMatter.replace("60 ml", "3");

    expect(
      parseRecipe(recipeFile(frontMatter), "x.md").metadata.ingredients[0]
        .amount,
    ).toBe("3");
  });

  it("names the file and the missing field", () => {
    const message = parseError(without("title"));

    expect(message).toContain("Invalid recipe 'mojito.md'");
    expect(message).toContain("title");
  });

  it("rejects a duration that is not ISO 8601", () => {
    const message = parseError(
      validFrontMatter.replace("P0Y0M0DT0H5M0S", "5 minuten"),
    );

    expect(message).toContain("duration");
    expect(message).toContain("ISO 8601");
  });

  it("rejects a duration without any component", () => {
    expect(
      parseError(validFrontMatter.replace("P0Y0M0DT0H5M0S", "P")),
    ).toContain("duration");
    expect(
      parseError(validFrontMatter.replace("P0Y0M0DT0H5M0S", "PT")),
    ).toContain("duration");
  });

  it("points at the broken ingredient", () => {
    const message = parseError(
      validFrontMatter.replace("    amount: 60 ml\n", ""),
    );

    expect(message).toContain("ingredients.0.amount");
  });

  it("rejects a recipe without ingredients", () => {
    const message = parseError(
      without("ingredients").replace("duration", "ingredients: []\nduration"),
    );

    expect(message).toContain("ingredients");
  });

  it("rejects an image path that is not absolute", () => {
    expect(
      parseError(
        validFrontMatter.replace("/images/recipes/", "images/recipes/"),
      ),
    ).toContain("imageSlug");
  });

  it("rejects tags that are not a list of text", () => {
    expect(
      parseError(validFrontMatter.replace("  - Cocktails", "  - 5")),
    ).toContain("tags.0");
  });

  it("lists every problem at once", () => {
    const message = parseError(
      without("title").replace("P0Y0M0DT0H5M0S", "nope"),
    );

    expect(message).toContain("title");
    expect(message).toContain("duration");
  });
});
