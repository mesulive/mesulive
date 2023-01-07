import { Flex, FlexProps } from "~ui/component/box/Flex";
import { mergeStyles } from "~ui/lib/util";

export const SectionBox = ({ sx: sxProp, ...restProps }: FlexProps) => (
  <Flex
    sx={mergeStyles(
      {
        backgroundColor: "white",
        boxShadow: "0px 0px 30px #7176791A",
        borderRadius: "20px",
        p: 16,
      },
      sxProp
    )}
    {...restProps}
  />
);
