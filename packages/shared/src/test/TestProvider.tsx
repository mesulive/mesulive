import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

export const TestProvider = ({ children }: { children: ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
