import Color from "color";
import { COLORS, ThemeComponents } from "../../lib";

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    grey: true;
  }
}

export const MuiIconButton: ThemeComponents["MuiIconButton"] = {
  styleOverrides: {
    root: ({ theme, ownerState }) =>
      theme.unstable_sx({
        transitionDuration: "0.3s",
        "&:hover": {
          backgroundColor: Color(COLORS.MAIN_LIGHTER).alpha(0.75).toString(),
          ...(ownerState.color === "grey" && {
            backgroundColor: COLORS.GRAY_6,
          }),
        },
      }),
  },
};
