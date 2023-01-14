import { createContext, ReactNode } from "react";

export interface IGlobalContext {
  scope: string;
}

export const GlobalContext = createContext<IGlobalContext>({ scope: "" });

export const GlobalProvider = ({
  scope,
  children,
}: IGlobalContext & { children?: ReactNode }) => {
  return (
    <GlobalContext.Provider value={{ scope }}>
      {children}
    </GlobalContext.Provider>
  );
};
