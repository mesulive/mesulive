import { TextField, TextFieldProps } from "@mui/material";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { putUnit } from "@mesulive/shared/src/number";
import { EMPTY_TEXT } from "@mesulive/shared";

export type NumberTextFieldProps = Omit<TextFieldProps, "type"> & {
  showUnit?: boolean;
};

export const NumberTextField = ({
  onKeyDown,
  showUnit,
  helperText,
  value,
  onChange,
  ...restProps
}: NumberTextFieldProps) => (
  <TextField
    type="number"
    onKeyDown={(event) => {
      if (["e", "E", "+", "-"].includes(event.key)) {
        event.preventDefault();
      }
      onKeyDown?.(event);
    }}
    value={value}
    onChange={(event) => {
      if (event.target.value.length <= 28) {
        onChange?.(event);
      }
    }}
    helperText={
      pipe(
        helperText,
        O.fromPredicate((v) => !!v),
        O.filter((v) => v !== EMPTY_TEXT),
        O.toUndefined
      ) ||
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
