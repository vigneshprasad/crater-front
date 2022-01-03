import { theme } from "lib/common/theme";
import { Provider } from "next-auth/client";
import { useEffect } from "react";
import OneSignal from "react-onesignal";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";

import type { AppProps } from "next/app";

import AuthModal from "@/auth/components/objects/AuthModal";
import BasicSignupSheet from "@/auth/components/objects/BasicSignupSheet";
import { AuthProvider } from "@/auth/context/AuthContext";
import { AuthModalProvider } from "@/auth/context/AuthModalContext";
import { AsideNavProvider } from "@/common/hooks/ui/useAsideNavState";
import { AnalyticsProvider } from "@/common/utils/analytics";
import fetcher from "@/common/utils/fetcher";

import GlobalStyle from "../lib/common/styles/global.styled";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const { session, user, profile } = pageProps;

  useEffect(() => {
    OneSignal.init({
      appId: "a8d5ac89-ade7-4394-8d2d-6b093a430f88",
    });
  }, []);
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
            <AnalyticsProvider>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <AsideNavProvider>
                  <Component {...pageProps} />
                </AsideNavProvider>
                <AuthModal />
                <BasicSignupSheet />
              </ThemeProvider>
            </AnalyticsProvider>
          </AuthModalProvider>
        </AuthProvider>
      </Provider>
    </SWRConfig>
  );
}
