import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Webinar } from "@/creators/types/community";

interface IUpcomingStreamsState {
  upcoming?: Webinar[];
  error?: unknown;
  loading: boolean;
}

export const UpcomingStreamsContext = createContext(
  {} as IUpcomingStreamsState
);

type IProviderProps = PropsWithChildren<{
  initial?: Webinar[];
}>;

export function UpcomingStreamsProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data: upcoming, error } = useSWR<Webinar[]>(
    API_URL_CONSTANTS.groups.getUpcominWebinars,
    {
      initialData: initial,
    }
  );
  const value: IUpcomingStreamsState = useMemo(
    () => ({
      upcoming,
      error,
      loading: !upcoming && !error,
    }),
    [upcoming, error]
  );
  return <UpcomingStreamsContext.Provider value={value} {...rest} />;
}

export function useUpcomingStreams(): IUpcomingStreamsState {
  const context = useContext(UpcomingStreamsContext);

  if (!context) {
    throw new Error("Please use UpcomingStreamsProvider in tree.");
  }

  return context;
}
