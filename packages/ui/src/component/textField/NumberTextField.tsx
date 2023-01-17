import { putUnit } from "@mesulive/shared/src/number";
import { TextField, TextFieldProps } from "@mui/material";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";

export type NumberTextFieldProps = Omit<TextFieldProps, "type" | "value"> & {
  onNumberChange?: (num: number | undefined) => void;
  value?: number | undefined;
  max?: number;
  showUnit?: boolean;
};

export const NumberTextField = ({
  showUnit,
  helperText,
  value,
  max = 10 ** 24 - 1,
  onNumberChange,
  onChange,
  ...restProps
}: NumberTextFieldProps) => (
  <TextField
    value={pipe(
      value,
      O.fromNullable,
      O.map((v) => v.toLocaleString()),
      O.matchW(
        () => "",
        (v) => v
      )
    )}
    onChange={(event) => {
      if (event.target.value.length <= 28) {
        if (onNumberChange) {
          pipe(
            event.target.value,
            O.fromNullable,
            O.map((v) => v.replace(/,/g, "")),
            O.map(Number),
            O.toUndefined,
            O.fromPredicate((v) => v === undefined || !Number.isNaN(v)),
            O.filter((v) => v === undefined || max === undefined || v <= max),
            O.match(() => {
              /* do nothing */
            }, onNumberChange)
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
