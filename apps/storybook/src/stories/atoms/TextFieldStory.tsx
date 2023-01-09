import { NumberTextField } from "@mesulive/ui";
import { InputAdornment, TextField } from "@mui/material";
import { EMPTY_TEXT } from "@mesulive/shared";

/**
 * FIXME NumberTextField의 onChange에 걸려있는 길이 제약 조건도 테스트할 수 있어야 함
 */

export interface TextFieldStoryProps {
  value?: string;
  label?: string;
  helperText?: string;
  startAdornment?: string;
  endAdornment?: string;
  error?: boolean;
  showUnit?: boolean;
}

export const TextFieldStory = ({
  value,
  label,
  helperText = EMPTY_TEXT,
  startAdornment = "상위",
  endAdornment = "메소",
  error,
}: TextFieldStoryProps) => (
  <TextField
    value={value}
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

export const NumberTextFieldStory = ({
  value,
  label,
  helperText = EMPTY_TEXT,
  startAdornment = "상위",
  endAdornment = "메소",
  error,
  showUnit = false,
}: TextFieldStoryProps) => (
  <NumberTextField
    value={value}
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
    showUnit={showUnit}
  />
);
