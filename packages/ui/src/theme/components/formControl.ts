import { ThemeComponents } from "~ui/lib";
import { DEFAULT_FONT_FAMILY } from "~ui/lib/constant";

export const MuiFormControl: ThemeComponents["MuiFormControl"] = {
  styleOverrides: {
    root: () => ({
      fontFamily: DEFAULT_FONT_FAMILY,
    }),
  },
};
