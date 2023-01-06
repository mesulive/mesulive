import { SectionBoxStory } from "$/stories/templates/SectionBoxStory";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Templates/SectionBox",
  component: SectionBoxStory,
} as ComponentMeta<typeof SectionBoxStory>;

export const Default: ComponentStory<typeof SectionBoxStory> = () => (
  <SectionBoxStory />
);
