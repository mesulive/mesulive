import { option } from "fp-ts";
import { pipe } from "fp-ts/function";
import { GD } from "~/lib/math";

describe("getCostFromTopPct", () => {
  test("valid input", () => {
    const inputArr: [number, number, number][] = [[0.01, 75, 138]];
    inputArr.forEach(([probability, topPct, result]) =>
      expect(
        pipe(
          GD.getCostFromTopPct(probability)(topPct),
          option.fromNullable,
          option.filter((v) => Math.abs(v - result) < 1),
          option.toUndefined
        )
      ).toBeTruthy()
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
          option.filter((v) => Math.abs(v - result) < 1),
          option.toUndefined
        )
      ).toBeTruthy()
    );
  });
});
