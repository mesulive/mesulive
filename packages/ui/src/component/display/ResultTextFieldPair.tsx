import { pxArray } from "@mesulive/shared";
import { CompareArrowsRounded } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { option } from "fp-ts";
import { pipe } from "fp-ts/function";
import { useState } from "react";
import { RecoilValue } from "recoil";
import { COLORS, mergeStyles, sx, Sx } from "../../lib";
import { Flex } from "../box";
import { NumberTextField } from "../textField";

export type ResultPairTextField = Sx & {
  unit?: string;
  showUnit?: boolean;
  max?: number;
} & (
    | {
        _tag: "Bernoulli";
        probability: number;
      }
    | { _tag: "data"; recoilValue: RecoilValue<number[]> }
  );

export const ResultTextFieldPair = ({
  sx: sxProp,
  unit,
  showUnit,
  max,
}: ResultPairTextField) => {
  const [cost, setCost] = useState<number | undefined>(undefined);
  const [topPct, setTopPct] = useState<number | undefined>(undefined);

  return (
    <Flex sx={mergeStyles({}, sxProp)} direction="row">
      <NumberTextField
        value={topPct}
        onNumberChange={(rawValue) => {
          const value = pipe(
            rawValue,
            option.fromNullable,
            option.map((v) => (v > 100 ? 100 : v)),
            option.toUndefined
          );

          setTopPct(value);

          // TODO cost 계산
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">상위</InputAdornment>
          ),
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        sx={styles.textField}
      />
      <CompareArrowsRounded sx={styles.arrowIcon} />
      <NumberTextField
        value={cost}
        onNumberChange={(rawValue) => {
          setCost(rawValue);

          // TODO topPct 계산
        }}
        InputProps={{
          endAdornment: unit ? (
            <InputAdornment position="end">{unit}</InputAdornment>
          ) : undefined,
        }}
        max={max}
        showUnit={showUnit}
        sx={styles.textField}
      />
    </Flex>
  );
};

const styles = {
  textField: sx({
    flex: 1,
  }),
  arrowIcon: sx({
    width: 36,
    height: 36,
    m: pxArray(4, 8, 8),
    color: COLORS.GRAY_2,
  }),
};
