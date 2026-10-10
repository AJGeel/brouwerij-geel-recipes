import md from "markdown-it";

/** Plain-text preparation steps, one per paragraph or list item, without markup or "1." numbering */
export const extractRecipeSteps = (content: string): string[] =>
  md()
    .parse(content, {})
    .filter((token) => token.type === "inline")
    .map((token) =>
      (token.children ?? [])
        .map((child) =>
          child.type === "softbreak" || child.type === "hardbreak"
            ? " "
            : child.type === "text" || child.type === "code_inline"
              ? child.content
              : "",
        )
        .join("")
        .replace(/^\d+\.\s*/, "")
        .trim(),
    )
    .filter(Boolean);
