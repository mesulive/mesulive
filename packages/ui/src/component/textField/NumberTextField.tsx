import { putUnit } from "@mesulive/shared/src/number";
import { TextField, TextFieldProps } from "@mui/material";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { useState } from "react";

export type NumberTextFieldProps = Omit<TextFieldProps, "type" | "value"> & {
  onNumberChange?: (num: number | undefined) => void;
  value?: number | undefined;
  max?: number;
  showUnit?: boolean;
  maxFractionDigits?: number;
};

export const NumberTextField = ({
  maxFractionDigits = 0,
  showUnit,
  helperText,
  value,
  max,
  onNumberChange,
  onChange,
  ...restProps
}: NumberTextFieldProps) => {
  const [outerValue, setOuterValue] = useState<string | undefined>(
    value?.toString()
  );

  return (
    <TextField
      value={outerValue}
      onChange={(event) => {
        if (event.target.value.length <= 28) {
          if (onNumberChange) {
            pipe(
              O.Do,
              O.bind("originalValue", () =>
                pipe(
                  event.target.value,
                  O.fromNullable,
                  O.map((v) => {
                    const chunks = v.split(".");

                    if (chunks.length <= 1) return v;

                    const lastChunks = chunks
                      .slice(-1)[0]
                      .slice(0, maxFractionDigits);
                    return chunks.slice(0, -1).concat(lastChunks).join(".");
                  }),
                  O.altW(() => O.some(undefined))
                )
              ),
              O.bind("numberValue", ({ originalValue }) =>
                pipe(
                  originalValue,
                  O.fromNullable,
                  O.map((v) => v.replace(/,/g, "")),
                  O.map(Number),
                  O.altW(() => O.some(undefined)),
                  O.filter((v) => v === undefined || !Number.isNaN(v)),
                  O.filter(
                    (v) => v === undefined || max === undefined || v <= max
                  )
                )
              ),
              O.match(
                () => {},
                ({ originalValue, numberValue }) => {
                  setOuterValue(originalValue);
                  onNumberChange(numberValue);
                }
              )
            );
            return;
          }
          onChange?.(event);
        }
      }}
      helperText={
        helperText ||
        pipe(
          Number(value),
          Math.floor,
          O.fromPredicate((v) => !Number.isNaN(v)),
          O.filter((v) => v > 0),
          O.filter(() => !!showUnit),
          O.map(putUnit),
          O.matchW(
            () => undefined,
            (v) => v
          )
        )
      }
      {...restProps}
    />
  );
};
