import { describe, expect, it } from "bun:test";

import { splitStepNumber } from "./splitStepNumber";

describe("splitStepNumber", () => {
  it("extracts the step number from a numbered paragraph", () => {
    expect(
      splitStepNumber("<p><strong>2.</strong> Bak de spek.</p>\n"),
    ).toEqual({ number: 2, html: "<p>Bak de spek.</p>\n" });
  });

  it("leaves other blocks untouched", () => {
    const html = "<p>Eet smakelijk!</p>\n";

    expect(splitStepNumber(html)).toEqual({ number: null, html });
  });
});
