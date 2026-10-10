import { describe, expect, it } from "bun:test";

import { spread } from "./spread";

describe("spread", () => {
  it("stays within [0, 1)", () => {
    for (let index = 0; index < 200; index++) {
      const value = spread(index, 3.7);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it("is deterministic", () => {
    expect(spread(5, 2.9)).toBe(spread(5, 2.9));
  });

  it("differs per index and per seed", () => {
    expect(spread(1, 1)).not.toBe(spread(2, 1));
    expect(spread(1, 1)).not.toBe(spread(1, 2.9));
  });
});
