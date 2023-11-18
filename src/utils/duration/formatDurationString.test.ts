import { describe, it, expect } from "bun:test";

import { formatDurationString } from "./formatDurationString";

describe("formatDurationString", () => {
  it("should format a duration string of 0 minutes", () => {
    const durationString = "PT0M";
    const result = formatDurationString(durationString);

    expect(result).toBe("");
  });

  it("should format a duration string of 50 minutes", () => {
    const durationString = "PT50M";
    const result = formatDurationString(durationString);

    expect(result).toBe("50 minuten");
  });

  it("should format a duration string of 100 minutes", () => {
    const durationString = "PT100M";
    const result = formatDurationString(durationString);

    expect(result).toBe("100 minuten");
  });
});
