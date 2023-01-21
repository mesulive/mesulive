import { Flex, FlexProps, mergeStyles } from "@mesulive/ui";
import { LAYOUT_PADDING } from "~/components/common/layout/constant";
import { NAVIGATION_WIDTH } from "~/components/common/navigation/constant";

export const PageContainer = ({
  sx: sxProp,
  gap = 16,
  ...restProps
}: FlexProps) => (
  <Flex
    sx={mergeStyles(
      (theme) => ({
        width: "100%",
        [theme.breakpoints.up("desktop")]: {
          width:
            theme.breakpoints.values["desktop"] -
            NAVIGATION_WIDTH -
            LAYOUT_PADDING * 2,
        },
      }),
      sxProp
    )}
    gap={gap}
    {...restProps}
  />
);
