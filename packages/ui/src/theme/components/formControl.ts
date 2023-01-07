import { DEFAULT_FONT_FAMILY, ThemeComponents } from "../../lib";

export const MuiFormControl: ThemeComponents["MuiFormControl"] = {
  styleOverrides: {
    root: () => ({
      fontFamily: DEFAULT_FONT_FAMILY,
    }),
  },
};
