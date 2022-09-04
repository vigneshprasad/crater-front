import { datadogRum } from "@datadog/browser-rum";
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import { theme } from "lib/common/theme";
import { Provider } from "next-auth/client";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";

import AuthModal from "@/auth/components/objects/AuthModal";
import BasicSignupSheet from "@/auth/components/objects/BasicSignupSheet";
import { AuthProvider } from "@/auth/context/AuthContext";
import { AuthModalProvider } from "@/auth/context/AuthModalContext";
import { SystemSocketProvider } from "@/auth/context/SystemSocketContext";
import { NotificationStack } from "@/common/components/objects/NotificationStack";
import { NotificationStackProvider } from "@/common/components/objects/NotificationStack/context";
import {
  UTM_SOURCE_STORAGE_KEY,
  UTM_CAMPAIGN_STORAGE_KEY,
  UTM_MEDIUM_STORAGE_KEY,
  REFERRER_ID_STORAGE_KEY,
  ENV,
  DD_CLIENT_TOKEN,
  DD_APPLICATION_ID,
  DD_SITE,
  DD_SERVICE,
  CLARITY_PID,
} from "@/common/constants/global.constants";
import { AsideNavProvider } from "@/common/hooks/ui/useAsideNavState";
import { AnalyticsProvider } from "@/common/utils/analytics";
import fetcher from "@/common/utils/fetcher";
import LearnNEarnModal from "@/stream/components/objects/LearnNEarnModal";
import { LearnModalProvider } from "@/stream/components/objects/LearnNEarnModal/context";

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
      service: DD_SERVICE,
      env: ENV,
      //  version: '1.0.0',
      sampleRate: 100,
      trackInteractions: true,
      defaultPrivacyLevel: "mask-user-input",
    });

    datadogRum.startSessionReplayRecording();
  }

  useEffect(() => {
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
        <NotificationStackProvider>
          <AuthProvider user={user} profile={profile}>
            <AuthModalProvider>
              <AnalyticsProvider>
                <ThemeProvider theme={theme}>
                  <LearnModalProvider>
                    <GlobalStyle />
                    <AsideNavProvider>
                      <SystemSocketProvider>
                        <Script strategy="afterInteractive">
                          {`
                        (function(c,l,a,r,i,t,y){
                          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "${CLARITY_PID}");
                      `}
                        </Script>
                        <Component {...pageProps} />
                      </SystemSocketProvider>
                    </AsideNavProvider>
                    <LearnNEarnModal />
                    <AuthModal />
                    <BasicSignupSheet />
                    <NotificationStack />
                  </LearnModalProvider>
                </ThemeProvider>
              </AnalyticsProvider>
            </AuthModalProvider>
          </AuthProvider>
        </NotificationStackProvider>
      </Provider>
    </SWRConfig>
  );
}
