import { Interpolation } from "@emotion/styled";
import { of } from "@mesulive/shared";
import { SxProps, Theme } from "@mui/material";
import { BREAKPOINTS, ScreenType } from "./constant";

export const sx = of<SxProps<Theme>>();

export const css = of<Interpolation<Theme>>();

export type Sx = { sx?: SxProps<Theme> };

export function mergeStyles(
  ...styles: (SxProps<Theme> | boolean | undefined)[]
): SxProps<Theme> {
  return styles.flatMap((s) => {
    if (s) {
      return Array.isArray(s) ? s : [s];
    }
    return {};
  });
}

export const getScreenType = (width: number): ScreenType => {
  if (width < BREAKPOINTS[ScreenType.tablet]) return ScreenType.mobile;
  if (width < BREAKPOINTS[ScreenType.laptop]) return ScreenType.tablet;
  if (width < BREAKPOINTS[ScreenType.desktop]) return ScreenType.laptop;
  return ScreenType.desktop;
};
