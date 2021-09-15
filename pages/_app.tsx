import { theme } from "lib/common/theme";
import { User } from "next-auth";
import { Provider } from "next-auth/client";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";

import type { AppProps } from "next/app";

import { ProfileProvider } from "@/auth/context/ProfileContext";
import { UserProvider } from "@/auth/context/UserContext";
import { Profile } from "@/auth/types/auth";
import fetcher from "@/common/utils/fetcher";

import GlobalStyle from "../lib/common/styles/global.styled";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const { session, user, profile } = pageProps;
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
        <ProfileProvider initial={profile as Profile | undefined}>
          <UserProvider initialData={user as User | undefined}>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <Component {...pageProps} />
            </ThemeProvider>
          </UserProvider>
        </ProfileProvider>
      </Provider>
    </SWRConfig>
  );
}
