import { pxArray, SVGProps } from "@mesulive/shared";
import { Button, Typography } from "@mui/material";
import Color from "color";
import { Properties } from "csstype";
import { FC } from "react";
import { mergeStyles, Sx } from "../../lib";
import { Flex } from "../box";

export interface MainLinkButtonBaseProps extends Sx {
  Icon?: FC<SVGProps>;
  disabled?: boolean;
  text: string;
  subText?: string;
  color: Properties["color"];
}

export const MainLinkButtonBase = ({
  Icon,
  disabled,
  text,
  subText,
  color,
  sx: sxProp,
}: MainLinkButtonBaseProps) => {
  return (
    <Button
      variant="contained"
      sx={mergeStyles(
        {
          backgroundColor: color,
          height: 120,
          borderRadius: "32px",
          overflow: "hidden",

          "&:hover, &:active": {
            backgroundColor: Color(color).darken(0.2).toString(),
          },
        },
        sxProp
      )}
      disabled={disabled}
    >
      {Icon && (
        <Icon
          css={{
            width: 160,
            height: 160,
            fill: "white",
            opacity: 0.5,
            position: "absolute",
            margin: pxArray(-40, 0, 0, -30),
            top: 0,
            left: 0,
          }}
        />
      )}
      <Flex>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 22,
          }}
          component="span"
        >
          {text}
        </Typography>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 16,
          }}
          component="span"
        >
          {subText}
        </Typography>
      </Flex>
    </Button>
  );
};
