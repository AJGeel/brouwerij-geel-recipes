const goldenRatio = 0.618034;

/**
 * Deterministic "random" value in [0, 1) for decorative layouts.
 * Evenly distributed without looking like a grid, and identical on server and
 * client, so it never causes hydration mismatches. Use a different `seed` per
 * property to decorrelate them.
 */
export const spread = (index: number, seed: number) =>
  ((((index + 1) * goldenRatio * seed) % 1) + 1) % 1;
