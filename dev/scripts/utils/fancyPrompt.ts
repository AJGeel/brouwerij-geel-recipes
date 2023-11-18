import chalk from "chalk";
import * as readlineSync from "readline-sync";

export const fancyPrompt = (
  question: string,
  index?: number,
  totalSteps?: number
) => {
  if (index && totalSteps) {
    return readlineSync.question(
      `\n${chalk.bold.bgWhite.black(`${index}/${totalSteps}:`)} ${question}\n`
    );
  }

  return readlineSync.question(`${question}\n`);
};
