import { COLORS } from "~ui/lib/color";
import { ThemeComponents } from "~ui/lib/type";

export const MuiFormHelperText: ThemeComponents["MuiFormHelperText"] = {
  styleOverrides: {
    root: ({ theme }) =>
      theme.unstable_sx({
        fontSize: 11,
        fontWeight: 600,
        color: COLORS.GRAY_4,
        mt: 2,
        ml: 12,
        [theme.breakpoints.up("laptop")]: {
          fontSize: 12,
        },

        "&.Mui-error": {
          fontWeight: 700,
        },
      }),
  },
  defaultProps: {
    children: "\u00a0",
  },
};
