const stepPattern = /^<p><strong>(\d+)\.<\/strong>\s*/;

/** Splits a rendered "**1.** text" paragraph into its step number and the remaining html */
export const splitStepNumber = (
  html: string,
): { number: number | null; html: string } => {
  const match = stepPattern.exec(html);

  if (!match) {
    return { number: null, html };
  }

  return {
    number: Number(match[1]),
    html: `<p>${html.slice(match[0].length)}`,
  };
};
