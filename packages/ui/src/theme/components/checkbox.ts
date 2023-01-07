import { COLORS } from "~ui/lib/color";
import { ThemeComponents } from "~ui/lib/type";

export const MuiCheckbox: ThemeComponents["MuiCheckbox"] = {
  styleOverrides: {
    root: () => ({
      padding: 0,
      color: COLORS.GRAY_3,

      "&.Mui-checked": {
        "~ .MuiFormControlLabel-label": {
          color: COLORS.MAIN,
        },
        span: {
          color: COLORS.MAIN,
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
