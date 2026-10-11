import fs from "fs";

import chalk from "chalk";
import * as readlineSync from "readline-sync";

import { recipeDirectory } from "@/config";
import { scanAllRecipes } from "@/services/markdown/load/scanAllRecipes";
import { githubAnnotation } from "@/utils/githubAnnotation";

import { deleteThumbnails } from "./utils/deleteThumbnails";
import { ingredientImageDirectory, publicDirectory } from "./utils/devConfig";
import {
  loadAcceptedDuplicates,
  saveAcceptedDuplicates,
  withoutAcceptedDuplicates,
} from "./utils/ingredients/acceptedDuplicates";
import { findDuplicateIngredients } from "./utils/ingredients/findDuplicateIngredients";
import {
  findMissingThumbnails,
  groupMissingByImage,
} from "./utils/ingredients/findMissingThumbnails";
import { findUnusedThumbnails } from "./utils/ingredients/findUnusedThumbnails";
import { isInteractive } from "./utils/isInteractive";
import { fillMissingThumbnails } from "./utils/thumbnails/fillMissingThumbnails";

const recipeFile = (slug: string) =>
  `${recipeDirectory.replace(/^\.\//, "")}/${slug}.md`;

const report = (
  level: "error" | "warning",
  title: string,
  lines: { text: string; file?: string }[],
) => {
  if (lines.length === 0) {
    return;
  }

  const color = level === "error" ? chalk.red : chalk.yellow;

  console.log(color.bold(`\n${title} (${lines.length})`));

  for (const { text, file } of lines) {
    console.log(color(`  - ${text}`));
    githubAnnotation(level, { title, file }, text);
  }
};

const recipes = scanAllRecipes(recipeDirectory, { strict: true }).sort((a, b) =>
  a.slug.localeCompare(b.slug),
);

const imageExists = (imageSlug: string) =>
  fs.existsSync(`${publicDirectory}${imageSlug}`);

const missing = findMissingThumbnails(recipes, imageExists);
const unused = findUnusedThumbnails(
  recipes,
  fs.readdirSync(`${publicDirectory}${ingredientImageDirectory}`),
);
const acceptedDuplicates = loadAcceptedDuplicates();
const duplicates = withoutAcceptedDuplicates(
  findDuplicateIngredients(recipes),
  acceptedDuplicates,
);

report(
  "error",
  "Ingredients without a thumbnail",
  missing.map(({ recipe, ingredient, imageSlug }) => ({
    text: `${recipe}: '${ingredient}' expects ${imageSlug}`,
    file: recipeFile(recipe),
  })),
);
report(
  "warning",
  "Possible duplicate ingredients",
  duplicates.map(({ names, reasons }) => ({
    text: `${names.map((name) => `'${name}'`).join(", ")} (${reasons.join(", ")})`,
  })),
);
report(
  "warning",
  "Thumbnails no recipe uses",
  unused.map((slug) => ({
    text: slug,
    file: `public${slug}`,
  })),
);

const promptForDuplicates = () => {
  console.log("");

  const accepted = duplicates.filter(({ names }) =>
    readlineSync.keyInYNStrict(
      `Is ${names.map((name) => `'${name}'`).join(" / ")} deliberate? Accept it so it is no longer reported?`,
    ),
  );

  if (accepted.length > 0) {
    saveAcceptedDuplicates([
      ...acceptedDuplicates,
      ...accepted.map(({ names }) => names),
    ]);
    console.log(
      chalk.green(`Saved ${accepted.length} to dev/acceptedDuplicates.json`),
    );
  }
};

const main = async () => {
  if (isInteractive()) {
    if (duplicates.length > 0) {
      promptForDuplicates();
    }

    if (
      missing.length > 0 &&
      readlineSync.keyInYNStrict("\nFind the missing thumbnails now?")
    ) {
      await fillMissingThumbnails(groupMissingByImage(missing));
    }

    if (
      unused.length > 0 &&
      readlineSync.keyInYNStrict("\nClean up the unused thumbnails now?")
    ) {
      deleteThumbnails(unused);
    }
  }

  if (findMissingThumbnails(recipes, imageExists).length > 0) {
    process.exit(1);
  }

  console.log(chalk.green("\nAll ingredients have a thumbnail."));
};

void main();
