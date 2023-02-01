import { Button, ButtonProps, useTheme } from "@mui/material";
import Color from "color";
import { useMemo } from "react";
import { COLORS, mergeStyles } from "../../lib";

export const LightButton = ({ color, sx: sxProp, ...props }: ButtonProps) => {
  const theme = useTheme();
  const backgroundColor = useMemo(() => {
    switch (color) {
      case undefined:
      case "inherit":
        return COLORS.MAIN_LIGHT;
      default:
        return theme.palette[color].light;
    }
  }, [color, theme.palette]);

  return (
    <Button
      color={color}
      sx={mergeStyles(
        {
          "&.MuiButton-contained": {
            "&:not(.Mui-disabled)": { backgroundColor },
            "&:hover, &:active": {
              backgroundColor: Color(backgroundColor).darken(0.3).toString(),
            },
          },

          "&.MuiButton-outlined": {
            "&:not(.Mui-disabled)": {
              borderColor: backgroundColor,
              color: backgroundColor,
            },
          },

          "&.MuiButton-text": {
            "&:not(.Mui-disabled)": {
              color: backgroundColor,
            },
          },
        },
        sxProp
      )}
      {...props}
    />
  );
};
