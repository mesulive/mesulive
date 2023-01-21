import { Flex, FlexProps, mergeStyles } from "@mesulive/ui";

export const SectionContainer = ({
  sx: sxProp,
  gap = 16,
  ...restProps
}: FlexProps) => (
  <Flex
    sx={mergeStyles(
      (theme) => ({
        [theme.breakpoints.up("laptop")]: {
          flexDirection: "row",
        },

        "& > *": {
          flex: 1,
        },
      }),
      sxProp
    )}
    gap={gap}
    {...restProps}
  />
);
