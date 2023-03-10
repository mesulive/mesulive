import { LightButton, MainButton, OptionButton, Sx } from "@mesulive/ui";
import { Button, ButtonProps as MuiButtonProps, Stack } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FC } from "react";
import { ButtonStory, ButtonStoryProps } from "~/stories/button/ButtonStory";

const meta: ComponentMeta<typeof ButtonStory> = {
  title: "Button/Button",
  component: ButtonStory,
};

export default meta;

const Template = ({
  ButtonProps,
  text = "버튼",
  color = "primary",
  sx,
  ...args
}: ButtonStoryProps &
  Sx & {
    ButtonProps: {
      Component: FC<MuiButtonProps>;
    } & MuiButtonProps;
  }) => {
  const variants: MuiButtonProps["variant"][] = [
    "contained",
    "outlined",
    "text",
  ];

  return (
    <Stack spacing={16} sx={sx}>
      {variants.map((variant) => (
        <Stack
          key={variant}
          direction="row"
          sx={{ width: "100%" }}
          spacing={16}
        >
          {[false, true].map((disabled) => (
            <ButtonProps.Component
              {...ButtonProps}
              {...args}
              variant={variant}
              color={color}
              disabled={disabled}
              key={`${disabled}`}
            >
              {text}
            </ButtonProps.Component>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export const Default: ComponentStory<typeof ButtonStory> = ({ ...props }) => (
  <Template ButtonProps={{ Component: Button }} {...props} />
);

export const Main: ComponentStory<typeof ButtonStory> = ({ ...props }) => (
  <Template
    ButtonProps={{
      Component: MainButton,
      sx: {
        flex: 1,
      },
    }}
    {...props}
  />
);

export const Option: ComponentStory<typeof ButtonStory> = ({ ...props }) => (
  <Template
    ButtonProps={{
      Component: OptionButton,
    }}
    {...props}
  />
);

export const Light: ComponentStory<typeof ButtonStory> = ({ ...props }) => (
  <Template
    ButtonProps={{
      Component: LightButton,
    }}
    {...props}
  />
);
