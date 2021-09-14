import { theme } from "lib/common/theme";
import { User } from "next-auth";
import { Provider } from "next-auth/client";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";

import type { AppProps } from "next/app";

import { UserProvider } from "@/auth/context/UserContext";
import fetcher from "@/common/utils/fetcher";

import GlobalStyle from "../lib/common/styles/global.styled";

export default function App({
  Component,
  pageProps: { session, user, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <SWRConfig
      value={{
        fetcher,
        // eslint-disable-next-line consistent-return
        onErrorRetry: (error) => {
          if (error?.status === 404) return undefined;
        },
      }}
    >
      <Provider session={session}>
        <UserProvider initialData={user as User | undefined}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </UserProvider>
      </Provider>
    </SWRConfig>
  );
}
