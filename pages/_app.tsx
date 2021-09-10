import { theme } from "lib/common/theme";
import { Provider } from "next-auth/client";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";

import type { AppProps } from "next/app";

import fetcher from "@/common/utils/fetcher";

import GlobalStyle from "../lib/common/styles/global.styled";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Provider session={session}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SWRConfig>
  );
}
