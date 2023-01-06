import {
  RadioGroupStory,
  RadioGroupStoryProps,
} from "$/stories/atoms/RadioGroupStory";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const meta: ComponentMeta<typeof RadioGroupStory> = {
  title: "Atom/RadioButton/RadioGroup",
  component: RadioGroupStory,
};

export default meta;

const Template = (props: RadioGroupStoryProps) => (
  <RadioGroupStory {...props} />
);

export const Default: ComponentStory<typeof RadioGroupStory> = (props) => (
  <Template {...props} />
);
