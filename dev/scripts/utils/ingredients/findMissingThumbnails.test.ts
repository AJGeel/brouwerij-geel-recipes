import { describe, expect, it } from "bun:test";

import {
  findMissingThumbnails,
  groupMissingByImage,
} from "./findMissingThumbnails";
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

describe("groupMissingByImage", () => {
  it("lists every missing image once, with the ingredients that use it", () => {
    expect(
      groupMissingByImage([
        { recipe: "a", ingredient: "Rum", imageSlug: "/rum.png" },
        { recipe: "b", ingredient: "Witte Rum", imageSlug: "/rum.png" },
        { recipe: "b", ingredient: "Rum", imageSlug: "/rum.png" },
        { recipe: "b", ingredient: "Ui", imageSlug: "/ui.png" },
      ]),
    ).toEqual([
      { imageSlug: "/rum.png", ingredients: ["Rum", "Witte Rum"] },
      { imageSlug: "/ui.png", ingredients: ["Ui"] },
    ]);
  });
});
