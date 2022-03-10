import { datadogRum } from "@datadog/browser-rum";
import { theme } from "lib/common/theme";
import { Provider } from "next-auth/client";
import { useEffect } from "react";
import OneSignal from "react-onesignal";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import AuthModal from "@/auth/components/objects/AuthModal";
import BasicSignupSheet from "@/auth/components/objects/BasicSignupSheet";
import { AuthProvider } from "@/auth/context/AuthContext";
import { AuthModalProvider } from "@/auth/context/AuthModalContext";
import {
  UTM_SOURCE_STORAGE_KEY,
  UTM_CAMPAIGN_STORAGE_KEY,
  UTM_MEDIUM_STORAGE_KEY,
  REFERRER_ID_STORAGE_KEY,
  ENV,
  DD_CLIENT_TOKEN,
  DD_APPLICATION_ID,
  DD_SITE,
} from "@/common/constants/global.constants";
import { AsideNavProvider } from "@/common/hooks/ui/useAsideNavState";
import { AnalyticsProvider } from "@/common/utils/analytics";
import fetcher from "@/common/utils/fetcher";

import GlobalStyle from "../lib/common/styles/global.styled";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const { session, user, profile } = pageProps;

  const router = useRouter();

  useEffect(() => {
    if (router) {
      const {
        utm_source: utmSource,
        utm_campaign: utmCampaign,
        utm_medium: utmMedium,
        referrer_id: referrerId,
      } = router.query;

      utmSource &&
        localStorage.setItem(UTM_SOURCE_STORAGE_KEY, utmSource as string);
      utmCampaign &&
        localStorage.setItem(UTM_CAMPAIGN_STORAGE_KEY, utmCampaign as string);
      utmMedium &&
        localStorage.setItem(UTM_MEDIUM_STORAGE_KEY, utmMedium as string);
      referrerId &&
        localStorage.setItem(REFERRER_ID_STORAGE_KEY, referrerId as string);
    }
  }, [router]);

  function intializeDataDog(): void {
    datadogRum.init({
      applicationId: DD_APPLICATION_ID,
      clientToken: DD_CLIENT_TOKEN,
      site: DD_SITE,
      //  service: 'my-web-application',
      env: ENV,
      //  version: '1.0.0',
      sampleRate: 100,
      trackInteractions: true,
    });
  }

  useEffect(() => {
    OneSignal.init({
      appId: "a8d5ac89-ade7-4394-8d2d-6b093a430f88",
    });
    intializeDataDog();
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
