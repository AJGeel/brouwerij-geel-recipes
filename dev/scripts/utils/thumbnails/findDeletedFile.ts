import { execFileSync } from "child_process";

const git = (args: string[], cwd: string) =>
  execFileSync("git", args, {
    cwd,
    maxBuffer: 50 * 1024 * 1024,
    stdio: ["ignore", "pipe", "ignore"],
  });

/** The last committed version of a file that was deleted since, so it can be restored instead of replaced */
export const findDeletedFile = (path: string, cwd = process.cwd()) => {
  try {
    const commit = git(
      ["log", "--diff-filter=D", "-1", "--format=%H", "--", path],
      cwd,
    )
      .toString()
      .trim();

    return commit ? git(["show", `${commit}^:${path}`], cwd) : undefined;
  } catch {
    return undefined;
  }
};
