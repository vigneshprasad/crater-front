import { Analytics, AnalyticsBrowser, Options } from "@segment/analytics-next";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import { SEGMENT_KEY } from "@/common/constants/global.constants";

export interface IAnalyticsState {
  track: (
    event: string,
    properties?: Record<string, unknown>,
    options?: Options,
    callback?: () => void
  ) => void;
  identify: (
    id?: string,
    traits?: Record<string, unknown>,
    options?: Options,
    callback?: () => void
  ) => void;
  page: (
    ...args: Parameters<Analytics["page"]>
  ) => ReturnType<Analytics["page"]> | undefined;
}

export const AnalyticsContext = createContext({} as IAnalyticsState);

type IProviderProps = PropsWithChildren<unknown>;

export function AnalyticsProvider({ ...rest }: IProviderProps): JSX.Element {
  const [segment, setSegment] = useState<Analytics | undefined>();
  const { session, profile, user } = useAuth();
  const router = useRouter();

  const page = useCallback(
    (
      ...args: Parameters<Analytics["page"]>
    ): ReturnType<Analytics["page"]> | undefined => {
      if (segment) {
        return segment?.page(...args);
      }
    },
    [segment]
  );

  const track = useCallback(
    (
      event: string,
      properties?: Record<string, unknown>,
      options?: Options,
      callback?: () => void
    ) => {
      if (segment) {
        segment.track(event, properties, options, callback);
      }
    },
    [segment]
  );

  const identify = useCallback(
    (
      id?: string,
      traits?: Record<string, unknown>,
      options?: Options,
      callback?: () => void
    ) => {
      if (segment) {
        segment.identify(id, traits, options, callback);
      }
    },
    [segment]
  );

  useEffect(() => {
    if (segment) {
      if (session && session.user && user) {
        identify(user.phone_number, {
          phoneNumber: user.phone_number,
          email: user.email,
          name: user.name,
          linkedin_url: profile?.linkedin_url,
          twitter: profile?.twitter,
        });
      }
    }
  }, [segment, session, profile, user, identify]);

  useEffect(() => {
    async function intialize(writeKey: string): Promise<void> {
      if (writeKey) {
        const [res] = await AnalyticsBrowser.load({ writeKey });
        setSegment(res);
        res.page();
      }
    }

    intialize(SEGMENT_KEY);
  }, []);

  // Router events
  useEffect(() => {
    const handlePageChnaged = (): void => {
      page();
    };

    router.events.on("routeChangeComplete", handlePageChnaged);

    return () => {
      router.events.off("routeChangeComplete", handlePageChnaged);
    };
  }, [router, page]);

  const value = useMemo(
    () => ({
      track,
      identify,
      page,
    }),
    [track, identify, page]
  );

  return <AnalyticsContext.Provider value={value} {...rest} />;
}

export default function useAnalytics(): IAnalyticsState {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error("You need to wrap AnalyticsProvider.");
  }

  return context;
}
