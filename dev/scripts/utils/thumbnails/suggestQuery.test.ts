import { describe, expect, it } from "bun:test";

import { suggestQuery } from "./suggestQuery";

describe("suggestQuery", () => {
  it("asks for the ingredient on a white background", () => {
    expect(suggestQuery("Groene asperges")).toBe(
      "Groene asperges op witte achtergrond",
    );
  });

  it("drops remarks in parentheses", () => {
    expect(suggestQuery("Brood (snee)")).toBe("Brood op witte achtergrond");
  });

  it("can use the name as-is", () => {
    expect(suggestQuery("Brood (snee)", false)).toBe("Brood");
  });
});
