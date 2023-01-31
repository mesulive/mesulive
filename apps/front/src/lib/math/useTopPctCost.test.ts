import { renderHook } from "@mesulive/shared";
import { option } from "fp-ts";
import { pipe } from "fp-ts/function";
import { constSelector } from "recoil";
import { GD } from "~/lib/math/index";
import { useTopPctCost } from "~/lib/math/useTopPctCost";

const arraySelector = constSelector([1, 2, 3, 4, 5]);

describe("useTopPctCost", () => {
  test("Bernoulli trial", () => {
    const {
      result: {
        current: { meanCost, meanTopPct, getCostFromTopPct, getTopPctFromCost },
      },
    } = renderHook(() =>
      useTopPctCost({ type: "Bernoulli", probability: 0.01 })
    );

    expect(meanCost).toBe(100);
    expect(meanTopPct).toBe(GD.getTopPctFromCost(0.01)(meanCost ?? -1));
    expect(
      pipe(
        getCostFromTopPct(75),
        option.fromNullable,
        option.filter((v) => Math.abs(138 - v) < 1),
        option.match(
          () => false,
          () => true
        )
      )
    ).toBeTruthy();
    expect(getTopPctFromCost(138)).toBe(GD.getTopPctFromCost(0.01)(138));

    // Edge case
    expect(getCostFromTopPct(100)).toBe(undefined);
    expect(getCostFromTopPct(Infinity)).toBe(undefined);
    expect(getCostFromTopPct(0)).toBe(undefined);

    expect(getTopPctFromCost(0)).toBe(undefined);
    expect(getTopPctFromCost(Infinity)).toBe(100);
  });

  test("data", () => {
    const {
      result: {
        current: { meanCost, meanTopPct, getCostFromTopPct, getTopPctFromCost },
      },
    } = renderHook(() =>
      useTopPctCost({ type: "data", recoilValue: arraySelector })
    );
    expect(meanCost).toBe(3);
    expect(meanTopPct).toBe(60);
    expect(getCostFromTopPct(60)).toBe(3);
    expect(getTopPctFromCost(5)).toBe(100);

    // Edge case
    expect(getCostFromTopPct(101)).toBe(undefined);
    expect(getCostFromTopPct(Infinity)).toBe(undefined);
    expect(getCostFromTopPct(0)).toBe(undefined);

    expect(getTopPctFromCost(0)).toBe(undefined);
    expect(getTopPctFromCost(1)).toBe(20);
    expect(getTopPctFromCost(Infinity)).toBe(100);
  });
});
