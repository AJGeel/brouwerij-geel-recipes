import { describe, expect, it } from "bun:test";

import { hostOf, isStockPhotoSite } from "./isStockPhotoSite";

describe("isStockPhotoSite", () => {
  it.each([
    "https://nl.123rf.com/photo_1.html",
    "https://nl.dreamstime.com/image1",
    "https://www.shutterstock.com/nl/image-photo/rice",
    "https://stock.adobe.com/nl/images/rice/1",
  ])("recognizes %s", (page) => {
    expect(isStockPhotoSite(page)).toBe(true);
  });

  it.each([
    "https://www.ah.nl/producten/risotto",
    "https://example.com/stockphoto",
    "not a url",
    undefined,
  ])("lets %s through", (page) => {
    expect(isStockPhotoSite(page)).toBe(false);
  });
});

describe("hostOf", () => {
  it("returns the host without www", () => {
    expect(hostOf("https://www.ah.nl/producten")).toBe("ah.nl");
  });
});
