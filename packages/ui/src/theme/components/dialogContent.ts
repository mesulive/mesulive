import { pxArray } from "@mesulive/shared";
import { ThemeComponents } from "../../lib";

export const MuiDialogContent: ThemeComponents["MuiDialogContent"] = {
  styleOverrides: {
    root: ({ theme }) =>
      theme.unstable_sx({
        fontSize: 12,

        ".MuiDialogTitle-root + &": {
          p: pxArray(16, 0),
        },

        ".MuiTypography-root": {
          fontSize: "inherit",
        },
      }),
  },
};
