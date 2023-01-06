import { SelectStory } from "$/stories/atoms/SelectStory";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const meta: ComponentMeta<typeof SelectStory> = {
  title: "Atom/Select",
  component: SelectStory,
};

export default meta;

export const Default: ComponentStory<typeof SelectStory> = (props) => (
  <SelectStory {...props} />
);
