import { describe, expect, it } from "bun:test";

import { renderMarkdownBlocks } from "./renderMarkdownBlocks";

describe("renderMarkdownBlocks", () => {
  it("renders every paragraph as its own block", () => {
    expect(renderMarkdownBlocks("**1.** Een\n\n**2.** Twee")).toEqual([
      "<p><strong>1.</strong> Een</p>\n",
      "<p><strong>2.</strong> Twee</p>\n",
    ]);
  });

  it("keeps a nested block like a list together", () => {
    const blocks = renderMarkdownBlocks("Intro\n\n- a\n- b\n\nOutro");

    expect(blocks).toHaveLength(3);
    expect(blocks[1]).toBe("<ul>\n<li>a</li>\n<li>b</li>\n</ul>\n");
  });

  it("returns nothing for empty content", () => {
    expect(renderMarkdownBlocks("")).toEqual([]);
  });
});
