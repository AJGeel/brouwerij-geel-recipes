import { minutesToDuration } from "@/utils/duration/minutesToDuration";
import { fancyPrompt } from "./utils/fancyPrompt";
import chalk from "chalk";
import { durationToISO } from "@/utils/duration/durationToISO";

const minutes = parseInt(fancyPrompt("Vul het aantal minuten in:"), 10);
const duration = durationToISO(minutesToDuration(minutes));

console.log("");
console.log(chalk.green(duration));
