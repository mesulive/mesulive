import { option } from "fp-ts";
import { pipe } from "fp-ts/function";
import { useCallback, useMemo } from "react";
import { constSelector, RecoilValue, useRecoilValue } from "recoil";
import { GD } from "~/lib/math/index";

const emptyArraySelector = constSelector([]);

export const useTopPctCost = (
  params:
    | {
        type: "Bernoulli";
        probability: number;
      }
    | { type: "data"; recoilValue: RecoilValue<number[]> }
) => {
  const { type } = params;
  const data = useRecoilValue(
    type === "data" ? params.recoilValue : emptyArraySelector
  );

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a - b);
  }, [data]);

  const getCostFromTopPct = useCallback(
    (topPct: number) => {
      switch (type) {
        case "Bernoulli":
          return GD.getCostFromTopPct(params.probability)(topPct);
        case "data":
          return pipe(
            topPct,
            option.fromPredicate((tp) => tp > 0 && tp <= 100),
            option.map(
              (tp) => sortedData[Math.floor((tp / 100) * sortedData.length) - 1]
            ),
            option.toUndefined
          );
      }
    },
    [type, params, sortedData]
  );

  const getTopPctFromCost = useCallback(
    (cost: number) => {
      switch (type) {
        case "Bernoulli":
          return GD.getTopPctFromCost(params.probability)(cost);
        case "data":
          return pipe(
            cost,
            option.fromPredicate((c) => c > 0),
            option.map((c) => {
              let i = 0;
              while (i < sortedData.length) {
                i++;
                if (sortedData[i - 1] >= c) break;
              }
              return (i / sortedData.length) * 100;
            }),
            option.toUndefined
          );
      }
    },
    [type, params, sortedData]
  );

  const meanCost = useMemo(() => {
    switch (type) {
      case "Bernoulli":
        return GD.mean(params.probability);
      case "data":
        return Math.ceil(
          sortedData.reduce((a, b) => a + b, 0) / sortedData.length
        );
    }
  }, [type, params, sortedData]);

  const meanTopPct = useMemo(
    () =>
      pipe(
        meanCost,
        option.fromNullable,
        option.map(getTopPctFromCost),
        option.toUndefined
      ),
    [getTopPctFromCost, meanCost]
  );

  return { meanCost, meanTopPct, getCostFromTopPct, getTopPctFromCost };
};
