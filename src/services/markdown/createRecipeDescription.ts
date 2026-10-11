import { extractRecipeSteps } from "./extractRecipeSteps";
import { truncateString } from "../ui/truncateString";

export const createRecipeDescription = (content: string) => {
  const steps = extractRecipeSteps(content).join(" ");

  return `${truncateString(`Bereiding: ${steps}`, 155)}...`;
};
