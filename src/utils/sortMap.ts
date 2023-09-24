export const sortMap = (inputMap: Map<string, number>) => {
  const sortedArray = Array.from(inputMap).sort((a, b) => {
    if (a[1] !== b[1]) {
      // Sort by count
      return b[1] - a[1];
    }

    // If count is equal, compare by key (string)
    return a[0].localeCompare(b[0]);
  });

  return new Map(sortedArray);
};
