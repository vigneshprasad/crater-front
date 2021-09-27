import { theme } from "lib/common/theme";
import { Provider } from "next-auth/client";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";

import type { AppProps } from "next/app";

import AuthModal from "@/auth/components/objects/AuthModal";
import BasicSignupSheet from "@/auth/components/objects/BasicSignupSheet";
import { AuthProvider } from "@/auth/context/AuthContext";
import { AuthModalProvider } from "@/auth/context/AuthModalContext";
import { AsideNavProvider } from "@/common/hooks/ui/useAsideNavState";
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
        <AuthProvider user={user} profile={profile}>
          <AuthModalProvider>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <AsideNavProvider>
                <Component {...pageProps} />
              </AsideNavProvider>
              <AuthModal />
              <BasicSignupSheet />
            </ThemeProvider>
          </AuthModalProvider>
        </AuthProvider>
      </Provider>
    </SWRConfig>
  );
}
