import { ThemeComponents } from "~/lib";
import { DEFAULT_FONT_FAMILY } from "~/lib/constant";

export const MuiFormControl: ThemeComponents["MuiFormControl"] = {
  styleOverrides: {
    root: () => ({
      fontFamily: DEFAULT_FONT_FAMILY,
    }),
  },
};
