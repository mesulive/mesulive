import { pxArray } from "@mesulive/shared";
import { Fade } from "@mui/material";
import Color from "color";
import { COLORS, ThemeComponents } from "../../lib";

const ITEM_HEIGHT = 48;

export const MuiSelect: ThemeComponents["MuiSelect"] = {
  styleOverrides: {
    select: () => ({
      "& .MuiPaper-root": {
        boxShadow: "none",
      },
    }),
  },
  defaultProps: {
    MenuProps: {
      TransitionComponent: Fade,
      PaperProps: {
        sx: {
          boxShadow: "0px 2px 10px #C5C5C580",
          borderRadius: "10px",
          p: 8,
          maxHeight: ITEM_HEIGHT * 8.75,
          boxSizing: "border-box",
        },
      },
      MenuListProps: {
        sx: {
          p: 0,

          "& .MuiMenuItem-root": {
            boxSizing: "border-box",
            height: ITEM_HEIGHT,
            p: pxArray(0, 8, 0, 12),
            m: pxArray(4, 0),
            borderRadius: "10px",
            color: COLORS.GRAY_2,
            transition: "all 0.1s ease-in",
            transitionProperty: "background-color, color",

            "&:hover": {
              backgroundColor: Color(COLORS.MAIN_LIGHTER).alpha(0.5).toString(),
              color: COLORS.MAIN_LIGHT,
            },

            "&.Mui-selected": {
              color: COLORS.MAIN,
              backgroundColor: COLORS.MAIN_LIGHTER,
              fontWeight: 700,
            },

            "& .MuiTouchRipple-root": {
              color: COLORS.MAIN,
              opacity: 0.5,
            },

            "&.Mui-focusVisible": {
              backgroundColor: "unset",
            },
          },
        },
      },
    },
  },
};
