import * as readlineSync from "readline-sync";
import slugify from "slugify";
import * as fs from "fs";
import chalk from "chalk";
import { capitalize } from "@/utils/capitalize";
import { minutesToDuration } from "@/utils/duration/minutesToDuration";
import { fancyPrompt } from "./utils/fancyPrompt";
import { durationToISO } from "@/utils/duration/durationToISO";

type IngredientInput = { name: string; amount: string; imageSlug: string };

const config = {
  recipeDir: "./public/recipes/",
  slugifyOptions: {
    lower: true,
    strict: true,
  },
};

// Function to create a numbered markdown list item
const createListItem = (index: number, text: string) =>
  `**${index}.** ${text}\n`;

// Prompt user for recipe information
const recipeName = fancyPrompt("Hoe wil je je recept noemen?", 1, 6);

const recipeUrl = fancyPrompt(
  "Hoe moet de URL van je recept eruit zien?",
  2,
  6
);

const ingredients: IngredientInput[] = [];
fancyPrompt("Voeg ingrediënten toe (Laat hem leeg om af te sluiten):", 3, 6);

let ingredientIndex = 1;
while (true) {
  const name = readlineSync.question(
    `  Ingredient ${ingredientIndex} name:   `
  );

  if (!name) {
    break;
  }

  const amount = readlineSync.question(
    `  Ingredient ${ingredientIndex} amount: `
  );

  const imageSlug =
    "/images/ingredients/" + slugify(name, config.slugifyOptions) + ".png";
  ingredients.push({ name, amount: amount.replace("x", "×"), imageSlug });
  ingredientIndex++;
}

const timeInMinutes = parseInt(
  fancyPrompt(
    "Hoe lang kost het je om het recept te maken? (in minuten)",
    4,
    6
  ),
  10
);

const tags = fancyPrompt(
  "Met welke tags zou je het recept omschrijven? (gescheiden door komma's)",
  5,
  6
);

// Create slug for the recipe URL
const recipeSlug = slugify(recipeUrl, config.slugifyOptions);

// Create the markdown filename
const fileName = `${config.recipeDir}${recipeSlug}.md`;

// Ensure the directory exists
if (!fs.existsSync(config.recipeDir)) {
  fs.mkdirSync(config.recipeDir, { recursive: true });
}

// Create the markdown file content
const content = `
---
title: ${recipeName}
imageSlug: /images/recipes/${slugify(recipeName, config.slugifyOptions)}.jpg
ingredients:
${ingredients
  .map(
    ({ name, amount, imageSlug }) =>
      `  - name: ${capitalize(
        name
      )}\n    amount: ${amount}\n    imageSlug: ${imageSlug}`
  )
  .join("\n")}
duration: ${durationToISO(minutesToDuration(timeInMinutes))}
tags: ${Array.from(tags.split(",").map((item) => `\n  - ${capitalize(item)}`))}
---
${createListItem(1, "")}
${createListItem(2, "")}
`;

// Write content to the file
fs.writeFileSync(fileName, content);

console.log(chalk.green(`\n✅ Recipe created successfully at ${fileName}`));
