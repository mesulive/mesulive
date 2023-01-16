import { COLORS, ThemeComponents } from "../../lib";

export const MuiInputAdornment: ThemeComponents["MuiInputAdornment"] = {
  styleOverrides: {
    root: ({ theme }) =>
      theme.unstable_sx({
        mt: "0 !important",
        "& .MuiTypography-root": {
          color: COLORS.GRAY_4,
          fontWeight: 700,
          wordBreak: "keep-all",
          whiteSpace: "pre",
          fontSize: "inherit",
          transition: "color 0.15s ease-in-out",

          ".Mui-focused &": {
            color: COLORS.MAIN,
          },
        },
      }),
  },
};
