import { ComponentMeta } from "@storybook/react";
import { DefaultProfile, DefaultProfileProps } from "@mesulive/ui";
import { getRandomPastelColor } from "@mesulive/shared";

const meta: ComponentMeta<typeof DefaultProfile> = {
  title: "Atom/DefaultProfile",
  component: DefaultProfile,
};

export default meta;

export const Default = ({ color, ...restProps }: DefaultProfileProps) => (
  <DefaultProfile color={color} {...restProps} />
);

Default.args = {
  color: getRandomPastelColor(50),
};
