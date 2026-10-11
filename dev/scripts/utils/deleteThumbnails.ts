import fs from "fs";

import chalk from "chalk";
import * as readlineSync from "readline-sync";

import { publicDirectory } from "./devConfig";

export const deleteThumbnails = (slugs: string[]) => {
  const deleted = slugs.filter((slug) => {
    if (!readlineSync.keyInYNStrict(`Delete ${slug}?`)) {
      return false;
    }

    fs.rmSync(`${publicDirectory}${slug}`);
    return true;
  });

  console.log(chalk.green(`\nDeleted ${deleted.length} of ${slugs.length}.`));
};
