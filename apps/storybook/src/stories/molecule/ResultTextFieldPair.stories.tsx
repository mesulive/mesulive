import { ResultTextFieldPair } from "@mesulive/ui";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const meta: ComponentMeta<typeof ResultTextFieldPair> = {
  title: "molecule/ResultTextFieldPair",
  component: ResultTextFieldPair,
};

export default meta;

const Template: ComponentStory<typeof ResultTextFieldPair> = ({ ...props }) => (
  <ResultTextFieldPair {...props} />
);

export const Bernoulli = Template.bind({
  _tag: "Bernoulli",
  probability: 0.5,
});
