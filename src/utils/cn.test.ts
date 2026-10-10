import { describe, it, expect } from "bun:test";


import { cn } from "./cn";

describe("cn", () => {
  it("joins class names and skips falsy values", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });

  it("supports conditional objects and arrays", () => {
    expect(cn(["a", { b: true, c: false }])).toBe("a b");
  });

  it("lets later Tailwind classes override earlier conflicting ones", () => {
    expect(cn("p-2 text-gray-500", "p-4 text-amber-500")).toBe(
      "p-4 text-amber-500"
    );
  });
});
