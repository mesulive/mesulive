import { MesuliveThemeProvider } from "@mesulive/ui";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "~/globals.css";
import Layout from "~/pages/layout";

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
