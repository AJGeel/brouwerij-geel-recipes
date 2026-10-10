import fs from "fs";

import { taxonomyPath } from "@/config";

export type Taxonomy = {
  /** Ingredient names that are a beer */
  beers: string[];
  /** Meal type to the tags that imply it, in display order */
  mealTypes: Record<string, string[]>;
};

export const loadTaxonomy = (): Taxonomy =>
  JSON.parse(fs.readFileSync(taxonomyPath, "utf-8"));
