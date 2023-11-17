import { describe, it, expect } from "bun:test";
import { durationToISO } from "./durationToISO";

describe("durationToISO", () => {
  it("should format a duration with all components", () => {
    const duration = {
      years: 1,
      months: 2,
      days: 3,
      hours: 4,
      minutes: 5,
      seconds: 6,
    };

    const result = durationToISO(duration);

    expect(result).toBe("P1Y2M3DT4H5M6S");
  });

  it("should format a duration with only some components", () => {
    const duration = {
      years: 0,
      months: 0,
      days: 3,
      hours: 4,
      minutes: 5,
      seconds: 0,
    };

    const result = durationToISO(duration);

    expect(result).toBe("P0Y0M3DT4H5M0S");
  });

  it("should format a duration with only minutes and seconds", () => {
    const duration = {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 15,
      seconds: 30,
    };

    const result = durationToISO(duration);

    expect(result).toBe("P0Y0M0DT0H15M30S");
  });

  it("should format a duration with zero values", () => {
    const duration = {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    const result = durationToISO(duration);

    expect(result).toBe("P0Y0M0DT0H0M0S");
  });
});
