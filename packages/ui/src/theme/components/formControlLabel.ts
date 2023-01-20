import { COLORS, ThemeComponents } from "../../lib";

export const MuiFormControlLabel: ThemeComponents["MuiFormControlLabel"] = {
  styleOverrides: {
    root: () => ({
      margin: 0,
      color: COLORS.GRAY_3,

      "&.Mui-disabled": {
        color: COLORS.MAIN_LIGHT,
      },
    }),
    label: () => ({
      fontSize: 14,
      fontWeight: 600,
      paddingLeft: 6,
      lineHeight: "normal",
      color: "inherit",
      "&.Mui-disabled": {
        color: "inherit",
      },
    }),
  },
};
