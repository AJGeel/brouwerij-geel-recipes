import fs from "fs";

import chalk from "chalk";
import * as readlineSync from "readline-sync";
import sharp from "sharp";

import { publicDirectory } from "../devConfig";
import { closeBrowser, SearchUnavailableError } from "./browserSession";
import { findDeletedFile } from "./findDeletedFile";
import { fitThumbnail } from "./fitThumbnail";
import { hostOf } from "./isStockPhotoSite";
import { openGallery } from "./openGallery";
import { removeBackground } from "./removeBackground";
import { searchGoogleImages, type Candidate } from "./searchGoogleImages";
import { suggestQuery } from "./suggestQuery";

export type MissingImage = { imageSlug: string; ingredients: string[] };

const toDataUrl = (png: Buffer) =>
  `data:image/png;base64,${png.toString("base64")}`;

const loadFromUrlOrPath = async (input: string) => {
  const cleaned = input
    .trim()
    .replace(/^(['"])(.*)\1$/, "$2")
    .replace(/\\ /g, " ");

  if (/^https?:\/\//.test(cleaned)) {
    const response = await fetch(cleaned);

    if (!response.ok) {
      throw new Error(`Download failed (${response.status})`);
    }

    return Buffer.from(await response.arrayBuffer());
  }

  return fs.readFileSync(cleaned.replace(/^~/, process.env.HOME ?? "~"));
};

const describeError = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

const describeSearchError = (error: unknown) =>
  error instanceof SearchUnavailableError
    ? error.message
    : `The search failed (${describeError(error)}).`;

const search = async (query: string) => {
  console.log(chalk.dim(`Searching Google Images for '${query}'...`));

  try {
    const candidates = await searchGoogleImages(query);

    if (candidates.length === 0) {
      console.log(chalk.yellow("No results."));
    } else {
      await openGallery({
        title: query,
        subtitle: "Choose one in your terminal",
        cards: candidates.map(({ dataUrl, page }, index) => ({
          label: String(index + 1),
          caption: page && hostOf(page),
          dataUrl,
        })),
      });
    }

    return candidates;
  } catch (error) {
    const reason = describeSearchError(error);

    console.log(chalk.yellow(`${reason} Paste an image instead with [p].`));

    return [];
  }
};

const originalDataUrl = async (image: Buffer) =>
  toDataUrl(
    await sharp(image)
      .resize(520, 520, { fit: "inside", withoutEnlargement: true })
      .png()
      .toBuffer(),
  );

/** Cuts out and fits the image, and shows it before and after, and as it will look on the site */
const previewThumbnail = async (image: Buffer) => {
  console.log(
    chalk.dim("Removing the background (the first run downloads the model)..."),
  );

  const thumbnail = await fitThumbnail(await removeBackground(image));
  const dataUrl = toDataUrl(thumbnail);

  await openGallery({
    title: "Does this look right?",
    subtitle: "Answer in your terminal",
    cards: [
      { label: "Original", dataUrl: await originalDataUrl(image) },
      {
        label: "Without background",
        dataUrl,
        background: "site",
        size: 224,
      },
      { label: "On the site", dataUrl, background: "site", size: 32 },
    ],
  });

  return thumbnail;
};

const keyActions = { e: "edit", t: "toggle", s: "skip", q: "quit" } as const;

/** The image to use, or what the developer wants to do instead */
type Choice = Buffer | (typeof keyActions)[keyof typeof keyActions];

const choose = async (
  candidates: Candidate[],
  toggleQuery: string,
): Promise<Choice> => {
  const numbers = candidates.length > 0 ? `$<1-${candidates.length}>` : "";
  const key = readlineSync.keyIn(
    `${candidates.length > 0 ? `Pick 1-${candidates.length}, ` : ""}[t] search '${toggleQuery}', [e]dit search, [p]aste URL/file, [s]kip, [q]uit: `,
    { limit: `${numbers}petsq`, guide: false },
  );
  console.log("");

  if (key in keyActions) {
    return keyActions[key as keyof typeof keyActions];
  }

  if (key === "p") {
    try {
      const input = readlineSync.question("Image URL or file path: ");

      return await loadFromUrlOrPath(input);
    } catch (error) {
      console.log(chalk.red(describeError(error)));

      return choose(candidates, toggleQuery);
    }
  }

  return candidates[Number(key) - 1].image;
};

const write = (item: MissingImage, thumbnail: Buffer) => {
  fs.writeFileSync(`${publicDirectory}${item.imageSlug}`, thumbnail);
  console.log(
    chalk.green(`Saved ${item.imageSlug}
`),
  );
};

/** Returns true when it was restored */
const restoreFromGit = (item: MissingImage) => {
  const deleted = findDeletedFile(`public${item.imageSlug}`);

  if (
    !deleted ||
    !readlineSync.keyInYNStrict(
      "This file was deleted earlier. Restore it from git?",
    )
  ) {
    return false;
  }

  fs.writeFileSync(`${publicDirectory}${item.imageSlug}`, deleted);
  console.log(chalk.green(`Restored ${item.imageSlug}\n`));

  return true;
};

/** Returns false when the developer wants to stop */
const fillOne = async (item: MissingImage) => {
  console.log(
    chalk.bold(`\n${item.ingredients.join(" / ")} -> ${item.imageSlug}`),
  );

  if (!item.imageSlug.endsWith(".png")) {
    console.log(chalk.yellow("Only .png thumbnails are supported, skipping."));

    return true;
  }

  if (restoreFromGit(item)) {
    return true;
  }

  const [name] = item.ingredients;
  let whiteBackground = true;
  let query = suggestQuery(name, whiteBackground);
  let candidates = await search(query);

  for (;;) {
    const choice = await choose(
      candidates,
      suggestQuery(name, !whiteBackground),
    );

    if (choice === "skip" || choice === "quit") {
      return choice === "skip";
    }

    if (choice === "toggle") {
      whiteBackground = !whiteBackground;
      query = suggestQuery(name, whiteBackground);
      candidates = await search(query);
      continue;
    }

    if (choice === "edit") {
      query = readlineSync.question("Search for: ", { defaultInput: query });
      candidates = await search(query);
      continue;
    }

    const thumbnail = await previewThumbnail(choice);

    if (readlineSync.keyInYNStrict("Use this thumbnail?")) {
      write(item, thumbnail);

      return true;
    }
  }
};

/** Walks through the missing thumbnails one by one, and returns how many were written */
export const fillMissingThumbnails = async (missing: MissingImage[]) => {
  let done = 0;

  try {
    for (const item of missing) {
      const before = fs.existsSync(`${publicDirectory}${item.imageSlug}`);

      if (!(await fillOne(item))) {
        break;
      }

      done += Number(
        !before && fs.existsSync(`${publicDirectory}${item.imageSlug}`),
      );
    }
  } finally {
    await closeBrowser();
  }

  return done;
};
