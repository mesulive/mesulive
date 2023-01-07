import { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import { MesuliveThemeProvider } from "~ui/theme";

export const TestProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MesuliveThemeProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </MesuliveThemeProvider>
  );
};
