import { describe, expect, it } from "bun:test";

import { findUnusedThumbnails } from "./findUnusedThumbnails";
import { recipe } from "./testUtils";

describe("findUnusedThumbnails", () => {
  it("reports files that no recipe uses, except the placeholder", () => {
    const recipes = [recipe("soup", ["Ui", "/images/ingredients/ui.png"])];

    expect(
      findUnusedThumbnails(recipes, [
        "ui.png",
        "weizen.png",
        "placeholder.png",
      ]),
    ).toEqual(["/images/ingredients/weizen.png"]);
  });
});
