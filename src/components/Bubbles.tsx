"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/utils/cn";
import { spread } from "@/utils/spread";

const baseCount = 12;
// The overview is mostly covered by recipe cards, so it gets extra bubbles
const denseCount = baseCount * 4;
const denseRoutes = ["/", "/tag"];
// Extending the pool never changes existing bubbles, only adds new ones
const bubbles = Array.from({ length: denseCount }, (_, index) => ({
  left: `${Math.round(spread(index, 1) * 96 + 2)}%`,
  size: 4 + Math.round(spread(index, 3.7) * 8),
  riseDuration: 22 + Math.round(spread(index, 5.3) * 18),
  swayDuration: 5 + Math.round(spread(index, 7.1) * 4),
  delay: -Math.round(spread(index, 2.9) * 40),
  // Fewer bubbles on small screens
  onMobile: index % baseCount < baseCount / 2,
}));

/**
 * A few faint carbonation bubbles that slowly rise behind the page.
 * Mostly CSS, so the compositor handles the animation. Bubbles beyond
 * `baseCount` fade in on dense routes and fade out elsewhere.
 * The parent needs to be a stacking context (`isolate`) to keep them behind content.
 */
function Bubbles() {
  const dense = denseRoutes.includes(usePathname());

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden motion-reduce:hidden"
    >
      {bubbles.map((bubble, index) => (
        <span
          key={index}
          className={cn(
            "absolute bottom-0 animate-bubble-rise will-change-transform",
            !bubble.onMobile && "max-md:hidden"
          )}
          style={{
            left: bubble.left,
            animationDuration: `${bubble.riseDuration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        >
          <span
            className={cn(
              "block animate-bubble-sway rounded-full border border-amber-500/40 bg-amber-500/10 transition-opacity duration-1000",
              index >= baseCount && !dense && "opacity-0"
            )}
            style={{
              width: bubble.size,
              height: bubble.size,
              animationDuration: `${bubble.swayDuration}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
}

export default Bubbles;
