import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";
import { Webinar } from "@/community/types/community";

interface IStreamsToRsvpState {
  streams?: Webinar[];
  error?: unknown;
  loading: boolean;
  nextPage: boolean;
  setStreamsToRsvpPage: SWRInfiniteResponse<
    PageResponse<Webinar>,
    unknown
  >["setSize"];
  mutateStreamsToRsvpPage: SWRInfiniteResponse<
    PageResponse<Webinar>,
    unknown
  >["mutate"];
}

export const StreamsToRsvpContext = createContext({} as IStreamsToRsvpState);

type IProviderProps = PropsWithChildren<{
  initial?: PageResponse<Webinar>;
  pageSize?: number;
  user?: string;
}>;

export function StreamsToRsvpProvider({
  initial,
  pageSize = 10,
  user,
  ...rest
}: IProviderProps): JSX.Element {
  const [nextPage, setNextPage] = useState(false);
  const {
    data: streams,
    error,
    setSize: setStreamsToRsvpPage,
    mutate: mutateStreamsToRsvpPage,
  } = useSWRInfinite<PageResponse<Webinar>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      return user
        ? `${API_URL_CONSTANTS.stream.streamsToRsvp}?page=${page}&page_size=${pageSize}`
        : null;
    },
    async (key: string) => {
      const response = await fetcher<PageResponse<Webinar>>(key);
      !response.next ? setNextPage(false) : setNextPage(true);
      return response;
    },
    {
      initialData: initial ? [initial] : undefined,
    }
  );

  const value: IStreamsToRsvpState = useMemo(
    () => ({
      streams: user ? streams?.flatMap((page) => page.results) : [],
      error,
      loading: !!user && !streams && !error,
      nextPage,
      setStreamsToRsvpPage,
      mutateStreamsToRsvpPage,
    }),
    [
      streams,
      error,
      nextPage,
      setStreamsToRsvpPage,
      mutateStreamsToRsvpPage,
      user,
    ]
  );

  return <StreamsToRsvpContext.Provider value={value} {...rest} />;
}

export default function useStreamsToRsvp(): IStreamsToRsvpState {
  const context = useContext(StreamsToRsvpContext);

  if (!context) {
    throw new Error("You need to wrap UpcomingStreamProvider.");
  }

  return context;
}
