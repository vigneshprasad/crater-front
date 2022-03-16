import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
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
  categoryFilter?: number;
}>;

export function PastStreamProvider({
  host,
  initial,
  pageSize = 10,
  categoryFilter,
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

      if (host) {
        return `${API_URL_CONSTANTS.groups.getPastWebinars}?host=${host}&page=${page}&page_size=${pageSize}`;
      }

      if (categoryFilter) {
        return `${API_URL_CONSTANTS.groups.getPastWebinars}?categories=${categoryFilter}&page=${page}&page_size=${pageSize}`;
      }

      return `${API_URL_CONSTANTS.groups.getPastWebinars}?page=${page}&page_size=${pageSize}`;
    },
    {
      initialData: initial ? [initial] : undefined,
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
