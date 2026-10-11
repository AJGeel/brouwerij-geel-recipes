import { describe, expect, it } from "bun:test";

import { findMissingThumbnails } from "./findMissingThumbnails";
import { recipe } from "./testUtils";

describe("findMissingThumbnails", () => {
  it("reports ingredients whose image does not exist", () => {
    const recipes = [recipe("soup", ["Ui", "/ui.png"], ["Prei", "/prei.png"])];

    expect(
      findMissingThumbnails(recipes, (slug) => slug === "/ui.png"),
    ).toEqual([{ recipe: "soup", ingredient: "Prei", imageSlug: "/prei.png" }]);
  });

  it("reports nothing when every image exists", () => {
    expect(
      findMissingThumbnails([recipe("soup", ["Ui", "/ui.png"])], () => true),
    ).toEqual([]);
  });
});
