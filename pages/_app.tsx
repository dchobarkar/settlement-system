import "../styles/globals.css";

import type { AppProps } from "next/app";

import SettlementProvider from "../context/SettlementContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SettlementProvider>
      <Component {...pageProps} />
    </SettlementProvider>
  );
}
