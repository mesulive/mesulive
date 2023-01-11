import { NumberTextField } from "@mesulive/ui";
import { InputAdornment, TextField } from "@mui/material";
import { EMPTY_TEXT } from "@mesulive/shared";
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
}

export const TextFieldStory = ({
  label,
  helperText = EMPTY_TEXT,
  startAdornment = "상위",
  endAdornment = "메소",
  error,
}: TextFieldStoryProps) => {
  return (
    <TextField
      label={label}
      helperText={helperText}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
      }}
      error={error}
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
}: TextFieldStoryProps) => {
  const [num, setNum] = useState<number | undefined>(undefined);

  return (
    <NumberTextField
      value={num}
      label={label}
      helperText={helperText}
      onNumberChange={setNum}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
      }}
      error={error}
      showUnit={showUnit}
      max={max}
    />
  );
};
