import { describe, it, expect } from "bun:test";
import { minutesToDuration } from "./minutesToDuration";

describe("minutesToDuration", () => {
  it("should convert 0 minutes to a duration object", () => {
    const result = minutesToDuration(0);
    expect(result).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("should convert 50 minutes to a duration object", () => {
    const result = minutesToDuration(50);
    expect(result).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 50,
      seconds: 0,
    });
  });

  it("should convert 100 minutes to a duration object", () => {
    const result = minutesToDuration(100);
    expect(result).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 1,
      minutes: 40,
      seconds: 0,
    });
  });

  it("should convert 420 minutes to a duration object", () => {
    const result = minutesToDuration(420);
    expect(result).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 7,
      minutes: 0,
      seconds: 0,
    });
  });

  it("should convert 1337 minutes to a duration object", () => {
    const result = minutesToDuration(1337);
    expect(result).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 22,
      minutes: 17,
      seconds: 0,
    });
  });
});
