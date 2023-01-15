import { EMPTY_TEXT } from "@mesulive/shared";
import { NumberTextField } from "@mesulive/ui";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";

/**
 * FIXME NumberTextField의 onChange에 걸려있는 길이 제약 조건도 테스트할 수 있어야 함
 */

export interface TextFieldStoryProps {
  label?: string;
  helperText?: string;
  startAdornment?: string;
  endAdornment?: string;
  error?: boolean;
  showUnit?: boolean;
  max?: number;
  variant?: TextFieldProps["variant"];
}

export const TextFieldStory = ({
  label,
  helperText = EMPTY_TEXT,
  startAdornment = "상위",
  endAdornment = "메소",
  error,
  variant,
}: TextFieldStoryProps) => {
  return (
    <TextField
      label={label}
      helperText={helperText}
      InputProps={{
        startAdornment: startAdornment && (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
        endAdornment: endAdornment && (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
      }}
      error={error}
      variant={variant}
    />
  );
};

export const NumberTextFieldStory = ({
  label,
  helperText = EMPTY_TEXT,
  startAdornment = "상위",
  endAdornment = "메소",
  error,
  showUnit = false,
  max,
  variant,
}: TextFieldStoryProps) => {
  const [num, setNum] = useState<number | undefined>(undefined);

  return (
    <NumberTextField
      value={num}
      label={label}
      helperText={helperText}
      onNumberChange={setNum}
      InputProps={{
        startAdornment: startAdornment && (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
        endAdornment: endAdornment && (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
      }}
      error={error}
      showUnit={showUnit}
      max={max}
      variant={variant}
    />
  );
};
