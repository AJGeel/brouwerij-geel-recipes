import { truncateString } from "../ui/truncateString";

export const createRecipeDescription = (content: string) => {
  const formattedDescription = `Bereiding: ${content.replace(
    /[*1-2.]+|(\r\n|\n|\r)/gm,
    ""
  )}`;

  return `${truncateString(formattedDescription, 155)}...`;
};
