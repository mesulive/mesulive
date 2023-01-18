import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";

export const mean = (prob: number) => Math.ceil(1 / prob);

export const getCostFromTopPct =
  (prob: number) =>
  (topPct: number): number | undefined =>
    pipe(
      { prob, topPct },
      O.some,
      O.filter(({ prob }) => prob > 0 && prob <= 1),
      O.filter(({ topPct }) => topPct > 0 && topPct < 100),
      O.map(
        ({ prob, topPct }) => Math.log(1 - topPct / 100) / Math.log(1 - prob)
      ),
      O.map(Math.ceil),
      O.getOrElseW(() => undefined)
    );

export const getTopPctFromCost =
  (prob: number) =>
  (cost: number): number | undefined =>
    pipe(
      { prob, cost },
      O.some,
      O.filter(({ prob }) => prob > 0 && prob <= 1),
      O.filter(({ cost }) => cost > 0),
      O.map(({ prob, cost }) => (1 - (1 - prob) ** cost) * 100),
      O.getOrElseW(() => undefined)
    );
