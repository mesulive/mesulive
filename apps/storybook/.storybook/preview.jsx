import { RecoilRoot } from "recoil";
import { MesuliveThemeProvider } from "@mesulive/ui/src";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    return (
      <MesuliveThemeProvider>
        <RecoilRoot>
          <Story />
        </RecoilRoot>
      </MesuliveThemeProvider>
    );
  },
];
