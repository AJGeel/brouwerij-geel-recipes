import sharp from "sharp";

// Measured on the existing thumbnails: 112×112, the longest side of the subject is 85-99px
export const THUMBNAIL_SIZE = 112;
const SUBJECT_SIZE = 96;

/** Trims the transparent edges, then centers the subject on a transparent thumbnail */
export const fitThumbnail = async (cutout: Buffer) => {
  const { data, info } = await sharp(cutout)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 10 })
    .resize(SUBJECT_SIZE, SUBJECT_SIZE, { fit: "inside" })
    .png()
    .toBuffer({ resolveWithObject: true });

  return sharp({
    create: {
      width: THUMBNAIL_SIZE,
      height: THUMBNAIL_SIZE,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: data,
        left: Math.round((THUMBNAIL_SIZE - info.width) / 2),
        top: Math.round((THUMBNAIL_SIZE - info.height) / 2),
      },
    ])
    .png()
    .toBuffer();
};
