import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Webinar } from "@/community/types/community";

interface IUpcomingStreamsState {
  upcoming?: Webinar[];
  error?: unknown;
  loading: boolean;
  mutateUpcomingStreams: SWRResponse<Webinar[], unknown>["mutate"];
}

export const UpcomingStreamsContext = createContext(
  {} as IUpcomingStreamsState
);

type IProviderProps = PropsWithChildren<{
  host?: string;
  initial?: Webinar[];
}>;

export function UpcomingStreamsProvider({
  host,
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const url = host
    ? `${API_URL_CONSTANTS.groups.getUpcominWebinars}?host=${host}`
    : API_URL_CONSTANTS.groups.getUpcominWebinars;

  const {
    data: upcoming,
    error,
    mutate: mutateUpcomingStreams,
  } = useSWR<Webinar[]>(url, {
    initialData: initial,
  });
  const value: IUpcomingStreamsState = useMemo(
    () => ({
      upcoming,
      error,
      loading: !upcoming && !error,
      mutateUpcomingStreams,
    }),
    [upcoming, error, mutateUpcomingStreams]
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
