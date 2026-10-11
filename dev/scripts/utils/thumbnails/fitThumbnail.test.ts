import { describe, expect, it } from "bun:test";
import sharp from "sharp";

import { fitThumbnail, THUMBNAIL_SIZE } from "./fitThumbnail";

// A solid red rectangle on a transparent canvas, like a cutout
const cutout = (width: number, height: number, canvas = 300) =>
  sharp({
    create: {
      width: canvas,
      height: canvas,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: {
          create: {
            width,
            height,
            channels: 4,
            background: { r: 255, g: 0, b: 0, alpha: 1 },
          },
        },
        left: 20,
        top: 50,
      },
    ])
    .png()
    .toBuffer();

const bounds = async (png: Buffer) => {
  const { info } = await sharp(png)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 10 })
    .toBuffer({ resolveWithObject: true });

  return {
    width: info.width,
    height: info.height,
    left: -(info.trimOffsetLeft ?? 0),
    top: -(info.trimOffsetTop ?? 0),
  };
};

describe("fitThumbnail", () => {
  it("outputs a transparent square of the thumbnail size", async () => {
    const result = sharp(await fitThumbnail(await cutout(60, 200)));
    const { width, height, format, hasAlpha } = await result.metadata();

    expect([width, height, format, hasAlpha]).toEqual([
      THUMBNAIL_SIZE,
      THUMBNAIL_SIZE,
      "png",
      true,
    ]);
  });

  it("scales the longest side of the subject to 96px and centers it", async () => {
    const box = await bounds(await fitThumbnail(await cutout(60, 200)));

    expect(box.height).toBe(96);
    expect(box.width).toBe(29);
    expect(box.top).toBe(8);
    expect(box.left).toBe(Math.round((THUMBNAIL_SIZE - box.width) / 2));
  });

  it("ignores empty space around the subject", async () => {
    const tight = await fitThumbnail(await cutout(100, 100, 200));
    const loose = await fitThumbnail(await cutout(100, 100, 400));

    expect(await bounds(loose)).toEqual(await bounds(tight));
  });
});
