"use client";

import { ReactNode, useSyncExternalStore } from "react";

import Morph from "./Morph";

type Props = {
  name: string;
  /** The viewport this element is visible on, CSS hides it on the other */
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

const getIsDesktop = () => window.matchMedia(desktopQuery).matches;

// The server can't know the viewport, so nothing claims the name until the
// client does. Guessing would briefly name both elements after hydration.
const getServerIsDesktop = () => null;

/**
 * A `Morph` for an element that is rendered twice, once per viewport, while CSS
 * hides one. Both stay mounted and a name may only exist once, so the `Morph`
 * is mounted around the visible element only, instead of toggling its name.
 */
const ResponsiveMorph = ({ name, visibleOn, children }: Props) => {
  const isDesktop = useSyncExternalStore(
    subscribe,
    getIsDesktop,
    getServerIsDesktop
  );

  if (isDesktop === null || isDesktop !== (visibleOn === "desktop")) {
    return children;
  }

  return <Morph name={name}>{children}</Morph>;
};

export default ResponsiveMorph;
