import fs from "fs";

import chalk from "chalk";

import { recipeDirectory } from "@/config";
import { scanAllRecipes } from "@/services/markdown/load/scanAllRecipes";

import { deleteThumbnails } from "./utils/deleteThumbnails";
import { ingredientImageDirectory, publicDirectory } from "./utils/devConfig";
import { findUnusedThumbnails } from "./utils/ingredients/findUnusedThumbnails";

if (!process.stdin.isTTY || process.env.CI) {
  console.error(chalk.red("This is a manual cleanup, run it in a terminal."));
  process.exit(1);
}

const unused = findUnusedThumbnails(
  scanAllRecipes(recipeDirectory, { strict: true }),
  fs.readdirSync(`${publicDirectory}${ingredientImageDirectory}`),
);

if (unused.length === 0) {
  console.log(chalk.green("No unused thumbnails."));
  process.exit(0);
}

console.log(chalk.yellow(`${unused.length} thumbnails no recipe uses:\n`));

deleteThumbnails(unused);
