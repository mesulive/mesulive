import Color from "color";
import { COLORS } from "~/lib/color";
import { ThemeComponents } from "~/lib/type";

export const MuiIconButton: ThemeComponents["MuiIconButton"] = {
  styleOverrides: {
    root: {
      transitionDuration: "0.3s",
      "&:hover": {
        backgroundColor: Color(COLORS.MAIN_LIGHTER).alpha(0.75).toString(),
      },
    },
  },
};
