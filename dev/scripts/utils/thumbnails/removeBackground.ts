import { pipeline, RawImage } from "@huggingface/transformers";
import sharp from "sharp";

// MIT licensed, runs locally; the model is downloaded on first use
const MODEL = "onnx-community/BiRefNet_lite-ONNX";

let remover: ReturnType<typeof loadRemover> | undefined;

const loadRemover = () =>
  pipeline("background-removal", MODEL, { dtype: "fp32" });

/** Returns a transparent PNG of the foreground */
export const removeBackground = async (image: Buffer) => {
  remover ??= loadRemover();

  const result = await (
    await remover
  )(await RawImage.fromBlob(new Blob([new Uint8Array(image)])));
  const cutout = Array.isArray(result) ? result[0] : result;

  return sharp(Buffer.from(cutout.data), {
    raw: {
      width: cutout.width,
      height: cutout.height,
      channels: cutout.channels,
    },
  })
    .png()
    .toBuffer();
};
