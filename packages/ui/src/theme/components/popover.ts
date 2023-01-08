import { ThemeComponents } from "../../lib";
import Color from "color";
import { Collapse } from "@mui/material";

export const MuiPopover: ThemeComponents["MuiPopover"] = {
  styleOverrides: {
    paper: ({ theme }) =>
      theme.unstable_sx({
        mt: 8,
        p: 16,
        boxShadow: `0px 0px 10px ${Color("#717679").alpha(0.15).toString()}`,
        borderRadius: "16px",
      }),
  },
  defaultProps: {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    TransitionComponent: Collapse,
  },
};
