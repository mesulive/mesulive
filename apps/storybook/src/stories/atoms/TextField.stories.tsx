import {
  NumberTextFieldStory,
  TextFieldStory,
} from "$/stories/atoms/TextFieldStory";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Atom/TextField",
  component: TextFieldStory,
} as ComponentMeta<typeof TextFieldStory>;

export const Default: ComponentStory<typeof TextFieldStory> = (props) => (
  <TextFieldStory {...props} />
);

export const Number: ComponentStory<typeof TextFieldStory> = (props) => (
  <NumberTextFieldStory {...props} />
);
