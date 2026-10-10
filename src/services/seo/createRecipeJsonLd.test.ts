import { describe, expect, it } from "bun:test";

import { createRecipeJsonLd } from "./createRecipeJsonLd";

const jsonLd = createRecipeJsonLd({
  slug: "omelet",
  metadata: {
    title: "Omelet",
    imageSlug: "/images/recipes/omelet.jpg",
    duration: "P0Y0M0DT0H15M0S",
    tags: ["Eten", "Brunch"],
    ingredients: [{ name: "Eieren", amount: "2×", imageSlug: "/x.png" }],
  },
  content: "**1.** Klop de eieren.\n\n**2.** Bak ze.",
});

describe("createRecipeJsonLd", () => {
  it("uses absolute urls", () => {
    expect(jsonLd.url).toBe(
      "https://brouwerij-geel-recipes.vercel.app/recept/omelet",
    );
    expect(jsonLd.image).toBe(
      "https://brouwerij-geel-recipes.vercel.app/images/recipes/omelet.jpg",
    );
  });

  it("describes the steps as numbered HowToSteps", () => {
    expect(jsonLd.recipeInstructions).toEqual([
      { "@type": "HowToStep", position: 1, text: "Klop de eieren." },
      { "@type": "HowToStep", position: 2, text: "Bak ze." },
    ]);
  });

  it("includes time, ingredients and keywords", () => {
    expect(jsonLd.totalTime).toBe("P0Y0M0DT0H15M0S");
    expect(jsonLd.recipeIngredient).toEqual(["2× Eieren"]);
    expect(jsonLd.keywords).toBe("Eten, Brunch");
  });
});
