import { ReactNode, ViewTransition } from "react";

type Props = {
  /** Skip the enter animation, for pages that animate their content in */
  exitOnly?: boolean;
  children: ReactNode;
};

/**
 * Slides a page in the direction of the navigation, see `navForward` and
 * `navBack` in utils/viewTransitions. Without a direction nothing animates.
 */
const PageTransition = ({ exitOnly = false, children }: Props) => (
  <ViewTransition
    default="none"
    enter={
      exitOnly
        ? "none"
        : {
            "nav-forward": "slide-in-from-right",
            "nav-back": "slide-in-from-left",
            default: "none",
          }
    }
    exit={{
      "nav-forward": "slide-out-to-left",
      "nav-back": "slide-out-to-right",
      default: "none",
    }}
  >
    {children}
  </ViewTransition>
);

export default PageTransition;
