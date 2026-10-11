import { truncateString } from "@/services/ui/truncateString";

import { extractRecipeSteps } from "./extractRecipeSteps";

export const createRecipeDescription = (content: string) => {
  const steps = extractRecipeSteps(content).join(" ");

  return `${truncateString(`Bereiding: ${steps}`, 155)}...`;
};
