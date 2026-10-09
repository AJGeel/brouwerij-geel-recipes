"use client";

import { ReactNode, useState, useSyncExternalStore } from "react";

type Props = {
  /** Position in the sequence, later items reveal later */
  index: number;
  /**
   * Length of the sequence. Long lists get a shorter step, so the whole wave
   * stays within the time budget instead of the tail entering all at once.
   */
  total?: number;
  className?: string;
  children: ReactNode;
};

const stepDelay = 60;
// The wave never takes longer than this, however long the list is
const maxTotalDelay = 800;
// Without a known length, long lists stop staggering after this many steps
const defaultTotal = 10;

const subscribeToNothing = () => () => {};

/**
 * Fades and slides its children in, one step after the previous `index`.
 * Only plays on a full page load, not when navigating to the page, because a
 * view transition (e.g. the card morph) needs the content to be in place.
 */
const Reveal = ({
  index,
  total = defaultTotal,
  className = "",
  children,
}: Props) => {
  // React reads the server snapshot while hydrating a full page load, and the
  // client snapshot when rendering a client navigation. Keep the first value.
  const [shouldReveal] = useState(
    useSyncExternalStore(
      subscribeToNothing,
      () => false,
      () => true
    )
  );

  const step = Math.min(stepDelay, maxTotalDelay / total);

  return (
    <div
      className={
        shouldReveal ? `motion-safe:animate-reveal ${className}` : className
      }
      style={
        shouldReveal
          ? { animationDelay: `${Math.min(index, total) * step}ms` }
          : undefined
      }
    >
      {children}
    </div>
  );
};

export default Reveal;
