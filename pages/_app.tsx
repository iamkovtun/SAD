import { ReactElement, ReactNode } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import HEAD from "next/head";
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <HEAD>
        <title>SAD</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </HEAD>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
