import { ThemeComponents } from "../../lib";

export const MuiDialogContent: ThemeComponents["MuiDialogContent"] = {
  styleOverrides: {
    root: ({ theme }) =>
      theme.unstable_sx({
        fontSize: 12,
        p: 16,
        overflowY: "overlay",

        ".MuiDialogTitle-root + &": {
          p: 16,
        },

        ".MuiTypography-root": {
          fontSize: "inherit",
        },
      }),
  },
};
