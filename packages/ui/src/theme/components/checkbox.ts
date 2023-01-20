import { COLORS, ThemeComponents } from "../../lib";

export const MuiCheckbox: ThemeComponents["MuiCheckbox"] = {
  styleOverrides: {
    root: () => ({
      padding: 0,
      color: COLORS.GRAY_3,

      // formControlLabel에서 설정 불가능
      "&.Mui-checked": {
        "~ .MuiFormControlLabel-label": {
          color: COLORS.MAIN,
        },
      },

      "&.Mui-disabled": {
        color: COLORS.MAIN_LIGHT,
        "~ .MuiFormControlLabel-label": {
          color: COLORS.MAIN_LIGHT,
        },
      },

      svg: {
        width: 16 * (16 / 12),
        height: 16 * (16 / 12),
        color: "unset",
      },
    }),
  },
};
