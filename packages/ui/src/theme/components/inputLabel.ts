import { COLORS, INPUT_PADDING, ThemeComponents } from "../../lib";

export const MuiInputLabel: ThemeComponents["MuiInputLabel"] = {
  styleOverrides: {
    root: () => ({
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.GRAY_3,
    }),
    outlined: () => ({
      transform: `translate(${INPUT_PADDING}px, ${INPUT_PADDING}px) scale(1)`,
      "&.MuiInputLabel-shrink": {
        transform: `translate(${INPUT_PADDING}px, ${
          -(20 * 0.8) / 2
        }px) scale(0.8)`,
      },
    }),
    filled: ({ theme }) =>
      theme.unstable_sx({
        position: "relative",
        transform: "none",
        mb: 4,
      }),
    shrink: () => ({
      fontWeight: 700,
    }),
  },
};
