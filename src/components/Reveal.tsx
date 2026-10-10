import { ReactNode } from "react";

type Props = {
  /** Position in the sequence, later items reveal later */
  index: number;
  /**
   * Length of the sequence. Long lists get a shorter step, so the whole wave
   * stays within the time budget instead of the tail entering all at once.
   */
  total?: number;
  /** Extra time to wait in ms, e.g. while a morphing image covers the content */
  delay?: number;
  className?: string;
  children: ReactNode;
};

// Gives a page that is being left time to fade out, see PageTransition
const startDelay = 100;
const stepDelay = 60;
// The wave never takes longer than this, however long the list is
const maxTotalDelay = 800;
// Without a known length, long lists stop staggering after this many steps
const defaultTotal = 10;

/** Fades and slides its children in when mounted, one step after the previous `index` */
const Reveal = ({
  index,
  total = defaultTotal,
  delay = 0,
  className = "",
  children,
}: Props) => {
  const step = Math.min(stepDelay, maxTotalDelay / total);

  return (
    <div
      className={`motion-safe:animate-reveal ${className}`}
      style={{
        animationDelay: `${startDelay + delay + Math.min(index, total) * step}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
