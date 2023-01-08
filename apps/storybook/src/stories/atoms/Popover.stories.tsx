import { ComponentMeta, Story } from "@storybook/react";
import { PopoverStory, PopoverStoryProps } from "~/stories/atoms/PopoverStory";

const meta: ComponentMeta<typeof PopoverStory> = {
  title: "Atom/Popover",
  component: PopoverStory,
};

export default meta;

const Template: Story<PopoverStoryProps> = (props) => (
  <PopoverStory {...props} />
);

export const Default = Template.bind({});
Default.args = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
};
