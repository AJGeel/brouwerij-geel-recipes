"use client";

import { ReactNode, ViewTransition, useSyncExternalStore } from "react";

type Props = {
  slug: string;
  /** The viewport this title is visible on, the other one is hidden with CSS */
  visibleOn: "mobile" | "desktop";
  children: ReactNode;
};

// Matches Tailwind's `md` breakpoint
const desktopQuery = "(min-width: 768px)";

const subscribe = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(desktopQuery);
  mediaQuery.addEventListener("change", onChange);

  return () => mediaQuery.removeEventListener("change", onChange);
};

/**
 * The recipe title is rendered twice, but only one is visible per viewport.
 * Both stay mounted, and two named transitions can't coexist, so only the
 * visible one gets the shared name.
 */
const RecipeTitleTransition = ({ slug, visibleOn, children }: Props) => {
  const isDesktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(desktopQuery).matches,
    () => false
  );
  const isVisible = isDesktop === (visibleOn === "desktop");

  return (
    <ViewTransition
      name={isVisible ? `recipe-title-${slug}` : undefined}
      share="morph"
      default="none"
    >
      {children}
    </ViewTransition>
  );
};

export default RecipeTitleTransition;
