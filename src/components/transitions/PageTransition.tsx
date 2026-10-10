import { ReactNode, ViewTransition } from "react";

type Props = {
  /** Also fade in, for what isn't built up by `Reveal`, like a header */
  fadeIn?: boolean;
  children: ReactNode;
};

/**
 * Fades a page out quickly when leaving. What replaces it builds itself up,
 * see `Reveal`, so fading both in and out would show two pages at once.
 */
const PageTransition = ({ fadeIn = false, children }: Props) => (
  <ViewTransition
    default="none"
    enter={fadeIn ? "fade-in-late" : "none"}
    exit="fade-out-fast"
  >
    {children}
  </ViewTransition>
);

export default PageTransition;
