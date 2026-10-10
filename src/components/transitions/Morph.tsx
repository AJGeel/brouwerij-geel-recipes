import { ReactNode, ViewTransition } from "react";

import { openRecipe } from "@/utils/viewTransitions";

type Props = {
  /** Elements with the same name morph into each other across pages */
  name: string;
  children: ReactNode;
};

/**
 * A shared element that morphs between a recipe card and its page, see
 * `.morph` in globals.css. Only when opening a recipe, see `openRecipe`.
 */
const Morph = ({ name, children }: Props) => (
  <ViewTransition
    name={name}
    share={{ [openRecipe]: "morph", default: "none" }}
    default="none"
  >
    {children}
  </ViewTransition>
);

export default Morph;
