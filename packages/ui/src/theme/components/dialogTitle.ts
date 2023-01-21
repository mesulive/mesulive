import { COLORS, ThemeComponents } from "../../lib";

export const MuiDialogTitle: ThemeComponents["MuiDialogTitle"] = {
  styleOverrides: {
    root: ({ theme }) =>
      theme.unstable_sx({
        color: COLORS.MAIN,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 18,
        p: 0,
      }),
  },
};
