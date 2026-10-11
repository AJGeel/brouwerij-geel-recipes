import { describe, expect, it } from "bun:test";

import { renderGallery } from "./renderGallery";

describe("renderGallery", () => {
  const html = renderGallery({
    title: "Rice <b>",
    subtitle: "Pick one",
    cards: [
      { label: "1", caption: "ah.nl", dataUrl: "data:image/png;base64,AAA" },
      {
        label: "2",
        dataUrl: "data:image/png;base64,BBB",
        background: "site",
        size: 32,
      },
    ],
  });

  it("renders a card per image", () => {
    expect(html.match(/class="card/g)).toHaveLength(2);
    expect(html).toContain("ah.nl");
    expect(html).toContain("width:32px");
  });

  it("only gives site cards the site background", () => {
    expect(html.match(/class="card site"/g)).toHaveLength(1);
  });

  it("escapes text", () => {
    expect(html).toContain("Rice &lt;b&gt;");
    expect(html).not.toContain("<b>");
  });
});
