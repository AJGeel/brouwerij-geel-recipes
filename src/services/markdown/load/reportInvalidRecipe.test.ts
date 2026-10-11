import { afterEach, beforeEach, describe, expect, it, spyOn } from "bun:test";

import { InvalidRecipeError } from "./parseRecipe";
import { reportInvalidRecipe } from "./reportInvalidRecipe";

let warn: ReturnType<typeof spyOn<Console, "warn">>;
let write: ReturnType<typeof spyOn<NodeJS.WriteStream, "write">>;
const originalGithubActions = process.env.GITHUB_ACTIONS;

const error = (source: string) =>
  new InvalidRecipeError(source, [
    "  - duration: Expected an ISO 8601 duration",
  ]);

describe("reportInvalidRecipe", () => {
  beforeEach(() => {
    warn = spyOn(console, "warn").mockImplementation(() => {});
    write = spyOn(process.stdout, "write").mockImplementation(() => true);
    delete process.env.GITHUB_ACTIONS;
  });

  afterEach(() => {
    warn.mockRestore();
    write.mockRestore();

    if (originalGithubActions === undefined) {
      delete process.env.GITHUB_ACTIONS;
    } else {
      process.env.GITHUB_ACTIONS = originalGithubActions;
    }
  });

  it("warns with the file and the problems", () => {
    reportInvalidRecipe(error("warns.md"));

    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0][0])).toContain(
      "Invalid recipe 'warns.md'",
    );
    expect(String(warn.mock.calls[0][0])).toContain("duration");
    expect(write).not.toHaveBeenCalled();
  });

  it("warns only once per recipe", () => {
    reportInvalidRecipe(error("once.md"));
    reportInvalidRecipe(error("once.md"));
    reportInvalidRecipe(error("other.md"));

    expect(warn).toHaveBeenCalledTimes(2);
  });

  it("adds a GitHub annotation on one line when running on GitHub Actions", () => {
    process.env.GITHUB_ACTIONS = "true";

    reportInvalidRecipe(error("annotated.md"));

    const output = String(write.mock.calls[0][0]);

    expect(output).toStartWith(
      "::warning file=public/recipes/annotated.md,title=Invalid recipe::",
    );
    expect(output).toContain("%0A");
    expect(output.trimEnd().split("\n")).toHaveLength(1);
  });
});
