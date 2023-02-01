import { Button } from "@mui/material";
import { ButtonProps } from "@mui/material/Button/Button";

export interface ButtonStoryProps {
  text?: string;
  color?: ButtonProps["color"];
}

export const ButtonStory = ({ text, ...props }: ButtonStoryProps) => (
  <Button {...props}>{text}</Button>
);
