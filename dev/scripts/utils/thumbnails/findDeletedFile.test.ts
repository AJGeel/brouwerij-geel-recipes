import { execFileSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

import { afterAll, beforeAll, describe, expect, it } from "bun:test";

import { findDeletedFile } from "./findDeletedFile";

let repo: string;

const git = (...args: string[]) =>
  execFileSync(
    "git",
    ["-c", "user.name=test", "-c", "user.email=t@t", ...args],
    { cwd: repo, stdio: "ignore" },
  );

beforeAll(() => {
  repo = fs.mkdtempSync(path.join(os.tmpdir(), "deleted-file-"));
  git("init", "-q");
  fs.writeFileSync(path.join(repo, "gone.png"), "old contents");
  fs.writeFileSync(path.join(repo, "kept.png"), "kept");
  git("add", ".");
  git("commit", "-q", "-m", "add");
  fs.rmSync(path.join(repo, "gone.png"));
  git("commit", "-q", "-am", "delete");
});

afterAll(() => {
  fs.rmSync(repo, { recursive: true, force: true });
});

describe("findDeletedFile", () => {
  it("returns the last version of a deleted file", () => {
    expect(findDeletedFile("gone.png", repo)?.toString()).toBe("old contents");
  });

  it("returns undefined for files that were never deleted or never existed", () => {
    expect(findDeletedFile("kept.png", repo)).toBeUndefined();
    expect(findDeletedFile("never.png", repo)).toBeUndefined();
  });
});
