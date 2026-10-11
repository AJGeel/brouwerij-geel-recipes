import fs from "fs";

import chalk from "chalk";

import { recipeDirectory } from "@/config";
import { scanAllRecipes } from "@/services/markdown/load/scanAllRecipes";

import { publicDirectory } from "./utils/devConfig";
import {
  findMissingThumbnails,
  groupMissingByImage,
} from "./utils/ingredients/findMissingThumbnails";
import { isInteractive } from "./utils/isInteractive";
import { fillMissingThumbnails } from "./utils/thumbnails/fillMissingThumbnails";

const main = async () => {
  if (!isInteractive()) {
    console.error(chalk.red("This is a manual tool, run it in a terminal."));
    process.exit(1);
  }

  const missing = groupMissingByImage(
    findMissingThumbnails(
      scanAllRecipes(recipeDirectory, { strict: true }).sort((a, b) =>
        a.slug.localeCompare(b.slug),
      ),
      (imageSlug) => fs.existsSync(`${publicDirectory}${imageSlug}`),
    ),
  );

  if (missing.length === 0) {
    console.log(chalk.green("No missing thumbnails."));
    return;
  }

  console.log(chalk.yellow(`${missing.length} thumbnails are missing.`));

  const done = await fillMissingThumbnails(missing);

  console.log(chalk.green(`\nCreated ${done} of ${missing.length}.`));
};

void main();
