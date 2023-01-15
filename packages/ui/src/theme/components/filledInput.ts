import { COLORS, ThemeComponents } from "../../lib";

export const MuiFilledInput: ThemeComponents["MuiFilledInput"] = {
  styleOverrides: {
    root: ({ theme }) =>
      theme.unstable_sx({
        borderRadius: "12px",

        "&, &:hover, &:active": {
          "::before, ::after": {
            border: "0 !important",
          },
        },

        "&.Mui-focused": {
          backgroundColor: COLORS.MAIN_LIGHTER,
        },
      }),
    input: ({ theme }) =>
      theme.unstable_sx({
        pt: 8,
        pb: 8,
      }),
  },
};
