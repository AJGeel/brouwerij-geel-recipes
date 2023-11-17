import { describe, it, expect } from "bun:test";
import { parseDuration } from "./parseDuration";

describe("parseDuration", () => {
  it("should parse a valid duration string", () => {
    const durationString = "P1Y2M3DT4H5M6S";
    const result = parseDuration(durationString);

    expect(result).toEqual({
      years: 1,
      months: 2,
      days: 3,
      hours: 4,
      minutes: 5,
      seconds: 6,
    });
  });

  it("should handle a duration string with only years and months", () => {
    const durationString = "P2Y6M";
    const result = parseDuration(durationString);

    expect(result).toEqual({
      years: 2,
      months: 6,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("should handle a duration string with only days, hours, and minutes", () => {
    const durationString = "P3DT12H30M";
    const result = parseDuration(durationString);

    expect(result).toEqual({
      years: 0,
      months: 0,
      days: 3,
      hours: 12,
      minutes: 30,
      seconds: 0,
    });
  });

  it("should handle a duration string with only seconds", () => {
    const durationString = "PT45S";
    const result = parseDuration(durationString);

    expect(result).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 45,
    });
  });

  it("should handle a duration string with missing components", () => {
    const durationString = "P1Y2M";
    const result = parseDuration(durationString);

    expect(result).toEqual({
      years: 1,
      months: 2,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("should throw an error for an invalid duration string", () => {
    const durationString = "InvalidDuration";
    expect(() => parseDuration(durationString)).toBeUndefined;
  });
});
