/** Prompts are for a developer at a terminal, never for CI or a pipe */
export const isInteractive = () =>
  Boolean(process.stdin.isTTY && !process.env.CI);
