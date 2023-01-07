import { MesuliveThemeProvider } from "@mesulive/ui";
import "@mesulive/ui/src/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Layout from "~/pages/layout";
import "~/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <MesuliveThemeProvider>
        <RecoilRoot>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </MesuliveThemeProvider>
      <Analytics />
    </>
  );
};

export default App;
