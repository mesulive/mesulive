import {
  COLORS,
  MainLinkButtonBase,
  MainLinkButtonBaseProps,
} from "@mesulive/ui";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Cube from "~/stories/assets/cube.svg";

const meta: ComponentMeta<typeof MainLinkButtonBase> = {
  title: "Button/MainLinkButtonBase",
  component: MainLinkButtonBase,
  argTypes: {
    Icon: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

export const Sample: ComponentStory<typeof MainLinkButtonBase> = (
  props: MainLinkButtonBaseProps
) => <MainLinkButtonBase {...props} />;

Sample.args = {
  Icon: Cube,
  text: "큐브 시뮬레이터",
  subText: "부제",
  color: COLORS.MAIN_LIGHT,
  sx: { width: "100%" },
};
