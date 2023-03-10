import { SectionSubtitle } from "@mesulive/ui/src";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export interface RadioGroupStoryProps {
  items?: string[];
  label?: string;
}

export const RadioGroupStory = ({
  items = ["버튼1", "버튼2", "버튼3"],
  label = "라벨",
}: RadioGroupStoryProps) => (
  <FormControl>
    <SectionSubtitle>{label}</SectionSubtitle>
    <RadioGroup>
      {items.map((item) => (
        <FormControlLabel
          value={item}
          control={<Radio />}
          label={item}
          key={item}
        />
      ))}
    </RadioGroup>
  </FormControl>
);
