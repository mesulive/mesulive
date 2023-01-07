import createCache from "@emotion/cache";
import {
  CacheProvider,
  ThemeProvider as EmotionThemeProvider,
} from "@emotion/react";
import {
  createTheme,
  Theme as MuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { ReactNode } from "react";
import "~ui/globals.css";
import { DEFAULT_FONT_FAMILY } from "~ui/lib/constant";
import { breakpoints } from "~ui/theme/breakpoints";
import { components } from "~ui/theme/components";
import { palette } from "~ui/theme/palette";

export const theme = createTheme({
  typography: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeightBold: 800,
    fontWeightMedium: 600,
    fontWeightRegular: 500,
    fontWeightLight: 400,
  },
  spacing: 1,
  palette,
  components,
  breakpoints,
});

declare module "@emotion/react" {
  interface Theme extends MuiTheme {}
}

const cache = createCache({ key: "mesu" });

export const MesuliveThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => (
  <CacheProvider value={cache}>
    <MuiThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </MuiThemeProvider>
  </CacheProvider>
);
