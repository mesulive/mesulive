import { COLORS } from "~/lib/color";
import { ThemeComponents } from "~/lib/type";

export const MuiInputAdornment: ThemeComponents["MuiInputAdornment"] = {
  styleOverrides: {
    root: () => ({
      "& .MuiTypography-root": {
        color: COLORS.GRAY_4,
        fontWeight: 700,
        wordBreak: "keep-all",
        whiteSpace: "pre",
        fontSize: "inherit",
      },
    }),
  },
};
