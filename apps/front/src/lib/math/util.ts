export const getCombinations = <T>(
  array: T[],
  numbersToSelect: number
): T[][] => {
  if (numbersToSelect > array.length) return [];

  const results: T[][] = [];

  if (numbersToSelect === 1) return array.map((el) => [el]);

  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, numbersToSelect - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    results.push(...attached);
  });

  return results;
};

export const getRepeatPermutations = <T>(array: T[], length: number): T[][] => {
  if (length === 1) return array.map((el) => [el]);

  const results: T[][] = [];

  array.forEach((fixed) => {
    const permutations = getRepeatPermutations(array, length - 1);
    const attached = permutations.map((permutation) => [fixed, ...permutation]);
    results.push(...attached);
  });

  return results;
};
