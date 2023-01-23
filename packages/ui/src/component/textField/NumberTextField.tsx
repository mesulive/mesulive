import { rent } from "@mesulive/shared";
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
  const [insertingPoint, setInsertingPoint] = useState(false);

  console.log(maxFractionDigits);

  return (
    <TextField
      value={pipe(
        value,
        O.fromNullable,
        O.map((v) =>
          v.toLocaleString(undefined, {
            maximumFractionDigits: maxFractionDigits,
          })
        ),
        O.matchW(
          () => "",
          (v) => `${v}${insertingPoint ? "." : ""}`
        )
      )}
      onChange={(event) => {
        if (event.target.value.length <= 28) {
          if (onNumberChange) {
            pipe(
              event.target.value,
              O.fromNullable,
              O.map((v) => v.replace(/,/g, "")),
              O.filter((v) => !!v),
              O.map(Number),
              O.map(
                (v) =>
                  Math.floor(v * 10 ** maxFractionDigits) /
                  10 ** maxFractionDigits
              ),
              O.altW(() => O.some(undefined)),
              O.filter((v) => v === undefined || !Number.isNaN(v)),
              O.filter((v) => v === undefined || max === undefined || v <= max),
              O.map(
                rent.io((v) => () => {
                  setInsertingPoint(
                    v !== undefined &&
                      !!maxFractionDigits &&
                      event.target.value.slice(-1) === "."
                  );
                })
              ),
              O.match(() => {}, onNumberChange)
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
