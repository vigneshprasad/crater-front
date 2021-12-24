import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";
import { Webinar } from "@/community/types/community";

interface IPastStreamState {
  streams?: Webinar[];
  error?: unknown;
  loading: boolean;
  setPastStreamsPage: SWRInfiniteResponse<
    PageResponse<Webinar>,
    unknown
  >["setSize"];
}

export const PastStreamContext = createContext({} as IPastStreamState);

type IProviderProps = PropsWithChildren<{
  host?: string;
  initial?: PageResponse<Webinar>;
  pageSize?: number;
}>;

export function PastStreamProvider({
  host,
  initial,
  pageSize = 10,
  ...rest
}: IProviderProps): JSX.Element {
  const {
    data: streams,
    error,
    setSize: setPastStreamsPage,
  } = useSWRInfinite<PageResponse<Webinar>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      return host
        ? `${API_URL_CONSTANTS.groups.getPastWebinars}?host=${host}&page=${page}&page_size=${pageSize}`
        : `${API_URL_CONSTANTS.groups.getPastWebinars}?page=${page}&page_size=${pageSize}`;
    },
    async (key: string) => {
      return await fetcher<PageResponse<Webinar>>(key);
    },
    {
      initialData: initial ? [[...initial]] : undefined,
    }
  );

  const value: IPastStreamState = useMemo(
    () => ({
      streams: streams?.flatMap((page) => page.results),
      error,
      loading: !streams && !error,
      setPastStreamsPage,
    }),
    [streams, error, setPastStreamsPage]
  );

  return <PastStreamContext.Provider value={value} {...rest} />;
}

export default function usePastStreams(): IPastStreamState {
  const context = useContext(PastStreamContext);

  if (!context) {
    throw new Error("You need to wrap PastStreamProvider.");
  }

  return context;
}
