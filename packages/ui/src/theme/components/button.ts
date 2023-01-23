import { ThemeComponents } from "../../lib";

export const MuiButton: ThemeComponents["MuiButton"] = {
  styleOverrides: {
    root: ({ ownerState }) => ({
      whiteSpace: "nowrap",
      boxShadow: "none",
      borderRadius: 16,
      fontWeight: "bold",

      "&:hover, &:active, &.Mui-focusVisible": {
        boxShadow: "none",
      },
      ...(ownerState.variant === "contained" && {
        color: "white",
      }),
    }),
    outlined: () => ({
      borderWidth: 2,
      "&:hover, &:active": {
        borderWidth: 2,
      },
    }),
  },
};
