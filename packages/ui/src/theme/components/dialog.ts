import { ThemeComponents } from "../../lib";

export const MuiDialog: ThemeComponents["MuiDialog"] = {
  styleOverrides: {
    root: ({ theme }) =>
      theme.unstable_sx({
        "& .MuiDialog-paper": {
          borderRadius: "40px",
          p: 16,
        },
      }),
  },
};
