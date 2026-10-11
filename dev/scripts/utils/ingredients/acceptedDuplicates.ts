import fs from "fs";

import { acceptedDuplicatesPath } from "../devConfig";
import type { DuplicateGroup } from "./findDuplicateIngredients";

/** Name sets that were reviewed and are deliberately kept apart */
type AcceptedDuplicates = string[][];

const toKey = (names: string[]) => [...names].sort().join("\n");

export const loadAcceptedDuplicates = (): AcceptedDuplicates =>
  fs.existsSync(acceptedDuplicatesPath)
    ? JSON.parse(fs.readFileSync(acceptedDuplicatesPath, "utf-8"))
    : [];

export const saveAcceptedDuplicates = (accepted: AcceptedDuplicates) =>
  fs.writeFileSync(
    acceptedDuplicatesPath,
    `${JSON.stringify(
      accepted
        .map((names) => [...names].sort())
        .sort((a, b) => toKey(a).localeCompare(toKey(b))),
      null,
      2,
    )}\n`,
  );

/** A group is only accepted when its names match exactly, so a new name joining it is reported again */
export const withoutAcceptedDuplicates = (
  groups: DuplicateGroup[],
  accepted: AcceptedDuplicates,
) => {
  const acceptedKeys = new Set(accepted.map(toKey));

  return groups.filter(({ names }) => !acceptedKeys.has(toKey(names)));
};
