import md from "markdown-it";
import type { Token } from "markdown-it";

const tokenText = ({ type, content }: Token) => {
  if (type === "softbreak" || type === "hardbreak") {
    return " ";
  }

  return type === "text" || type === "code_inline" ? content : "";
};

/** Plain-text preparation steps, one per paragraph or list item, without markup or "1." numbering */
export const extractRecipeSteps = (content: string): string[] =>
  md()
    .parse(content, {})
    .filter((token) => token.type === "inline")
    .map((token) =>
      (token.children ?? [])
        .map(tokenText)
        .join("")
        .replace(/^\d+\.\s*/, "")
        .trim(),
    )
    .filter(Boolean);
