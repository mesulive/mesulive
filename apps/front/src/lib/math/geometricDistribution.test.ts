import { GD } from "~/lib/math";

describe("getGeometricCost", () => {
  test("valid input", () => {
    const inputArr: [number, number][] = [[0.01, 75]];
    inputArr.forEach(([probability, topPct]) =>
      expect(GD.getCostFromTopPct(probability)(topPct)).toBe(138)
    );
  });
});
