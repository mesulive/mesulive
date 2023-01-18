import { option } from "fp-ts";
import { pipe } from "fp-ts/function";
import { GD } from "~/lib/math";

describe("getCostFromTopPct", () => {
  test("valid input", () => {
    const inputArr: [number, number, number][] = [[0.01, 75, 138]];
    inputArr.forEach(([probability, topPct, result]) =>
      expect(GD.getCostFromTopPct(probability)(topPct)).toBe(result)
    );
  });
});

describe("getTopPctFromCost", () => {
  test("valid input", () => {
    const inputArr: [number, number, number][] = [[0.01, 138, 75]];
    inputArr.forEach(([probability, cost, result]) =>
      expect(
        pipe(
          GD.getTopPctFromCost(probability)(cost),
          option.fromNullable,
          option.map(Math.floor),
          option.toUndefined
        )
      ).toBe(result)
    );
  });
});
