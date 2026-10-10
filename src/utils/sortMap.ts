export const sortMap = (inputMap: Map<string, number>) => {
  const sortedArray = Array.from(inputMap).sort((a, b) => {
    if (a[1] !== b[1]) {
      return b[1] - a[1];
    }

    return a[0].localeCompare(b[0]);
  });

  return new Map(sortedArray);
};
