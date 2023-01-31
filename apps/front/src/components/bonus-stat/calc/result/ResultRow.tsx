import {
  COLORS,
  Flex,
  NumberTextField,
  SectionSubtitle,
  sx,
  Sx,
} from "@mesulive/ui";
import { CompareArrowsRounded } from "@mui/icons-material";
import { Box, InputAdornment, Typography } from "@mui/material";
import { pipe } from "fp-ts/function";
import { floor } from "lodash";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { BonusStat } from "~/lib/bonus-stat";
import { BonusStatState } from "~/lib/bonus-stat/state";
import { useTopPctCost } from "~/lib/math/useTopPctCost";
import { getPercent } from "~/lib/math/util";

interface Props extends Sx {
  method: BonusStat.Method;
}

const MAX_FRAC_DIGITS = 4;

export const ResultRow = ({ method }: Props) => {
  const result = useRecoilValue(BonusStatState.calcResultSelector(method));
  const { meanCost, meanTopPct, getCostFromTopPct, getTopPctFromCost } =
    useTopPctCost({
      type: "Bernoulli",
      probability: result ?? -1,
    });
  const [cost, setCost] = useState<number | undefined>(undefined);
  const [topPct, setTopPct] = useState<number | undefined>(undefined);

  useEffect(() => {
    setCost(meanCost);
    setTopPct(meanTopPct);
  }, [meanCost, meanTopPct]);

  return (
    <Box>
      <SectionSubtitle>{BonusStat.MethodInfoMap[method].text}</SectionSubtitle>
      <Typography sx={styles.subTypo}>
        확률: {result !== undefined && `${floor(result * 100, 8)}%`}
      </Typography>
      <Typography sx={styles.subTypo}>
        평균:{" "}
        {result !== undefined &&
          meanCost !== undefined &&
          `${meanCost.toLocaleString()}회 (상위 ${pipe(
            1 / result,
            getTopPctFromCost,
            (v) => v ?? 0,
            (v) => v / 100,
            getPercent
          )})`}
      </Typography>
      <Flex direction="row" sx={{ mt: 8 }} gap={8} align="start">
        <NumberTextField
          value={topPct}
          onNumberChange={(value) => {
            setTopPct(value);
            if (value !== undefined) {
              setCost(getCostFromTopPct(value));
            }
          }}
          maxFractionDigits={MAX_FRAC_DIGITS}
          max={100}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">상위</InputAdornment>
            ),
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          sx={{ flex: 1 }}
        />
        <CompareArrowsRounded
          sx={{ width: 32, height: 32, color: COLORS.GRAY_3 }}
        />
        <NumberTextField
          value={cost}
          sx={{ flex: 1 }}
          onNumberChange={(value) => {
            setCost(value);
            if (value !== undefined) {
              setTopPct(getTopPctFromCost(value));
            }
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">회</InputAdornment>,
          }}
        />
      </Flex>
    </Box>
  );
};

const styles = {
  titleTypo: sx({}),
  subTypo: sx((theme) => ({
    fontSize: 12,
    color: COLORS.GRAY_3,
    fontWeight: 600,

    [theme.breakpoints.up("laptop")]: {
      fontSize: 14,
    },
  })),
};
