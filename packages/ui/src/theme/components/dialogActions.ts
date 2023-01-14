import { ThemeComponents } from "../../lib";

export const MuiDialogActions: ThemeComponents["MuiDialogActions"] = {
  styleOverrides: {
    root: ({ theme }) =>
      theme.unstable_sx({
        justifyContent: "center",
      }),
  },
};
