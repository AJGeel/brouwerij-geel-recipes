import { describe, expect, it } from "bun:test";

import { withoutAcceptedDuplicates } from "./acceptedDuplicates";
import type { DuplicateGroup } from "./findDuplicateIngredients";

const group = (...names: string[]): DuplicateGroup => ({
  names,
  reasons: ["same-thumbnail"],
});

describe("withoutAcceptedDuplicates", () => {
  it("removes groups that were accepted, in any order", () => {
    expect(
      withoutAcceptedDuplicates(
        [group("Rum", "Witte Rum"), group("Ui", "Uien")],
        [["Witte Rum", "Rum"]],
      ),
    ).toEqual([group("Ui", "Uien")]);
  });

  it("reports a group again when a new name joins it", () => {
    const grown = group("Bruine rum", "Rum", "Witte Rum");

    expect(withoutAcceptedDuplicates([grown], [["Rum", "Witte Rum"]])).toEqual([
      grown,
    ]);
  });
});
