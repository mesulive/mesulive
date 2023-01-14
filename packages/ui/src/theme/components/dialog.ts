import { ThemeComponents } from "../../lib";

export const MuiDialog: ThemeComponents["MuiDialog"] = {
  styleOverrides: {
    root: ({ theme }) =>
      theme.unstable_sx({
        "& .MuiDialog-paper": {
          borderRadius: "24px",
          p: 16,
        },
      }),
  },
};
