import { option } from "fp-ts";
import { pipe } from "fp-ts/function";
import { WRONG_STATISTIC_RESULT } from "~/lib/math/constant";

export const mean = (prob: number) => Math.ceil(1 / prob);

export const getCostFromTopPct =
  (prob: number) =>
  (topPct: number): number =>
    pipe(
      { prob, topPct },
      option.some,
      option.filter(({ prob }) => prob >= 0 && prob <= 1),
      option.filter(({ topPct }) => topPct > 0 && topPct <= 100),
      option.map(({ prob, topPct }) =>
        Math.ceil(Math.log(1 - topPct / 100) / Math.log(1 - prob))
      ),
      option.getOrElseW(() => WRONG_STATISTIC_RESULT)
    );

export const getTopPctFromCost =
  (prob: number) =>
  (cost: number): number =>
    pipe(
      { prob, cost },
      option.some,
      option.filter(({ prob }) => prob >= 0 && prob <= 1),
      option.filter(({ cost }) => cost > 0),
      option.map(({ prob, cost }) =>
        Math.ceil((1 - Math.pow(1 - prob, cost)) * 100)
      ),
      option.getOrElseW(() => WRONG_STATISTIC_RESULT)
    );
