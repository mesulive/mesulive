import {
  getCombinations,
  getPercent,
  getRepeatPermutations,
} from "~/lib/math/util";

describe("getCombinations", () => {
  test("number", () => {
    expect(getCombinations([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4],
    ]);
  });
});

describe("getRepeatPermutations", () => {
  test("number", () => {
    expect(getRepeatPermutations([1, 2, 3, 4], 2)).toEqual([
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4],
    ]);
  });
});

describe("getPercent", () => {
  test("number", () => {
    expect(getPercent(0.123456789)).toBe("12.34%");
  });
});
