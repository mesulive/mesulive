import { mergeStyles } from "../../lib";
import { Flex, FlexProps } from "./Flex";

export const SectionBox = ({
  sx: sxProp,
  gap = 16,
  ...restProps
}: FlexProps) => (
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
    gap={gap}
    {...restProps}
  />
);
