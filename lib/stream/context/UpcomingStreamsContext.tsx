import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";
import { Webinar } from "@/community/types/community";

interface IUpcomingStreamsState {
  upcoming?: Webinar[];
  error?: unknown;
  loading: boolean;
  nextPage: boolean;
  sortBy?: string;
  setUpcomingStreamsPage: SWRInfiniteResponse<
    PageResponse<Webinar>,
    unknown
  >["setSize"];
  mutateUpcomingStreams: SWRInfiniteResponse<
    PageResponse<Webinar>,
    unknown
  >["mutate"];
  setPageSize: Dispatch<SetStateAction<number>>;
  isValidating: boolean;
  category?: number;
}

export const UpcomingStreamsContext = createContext(
  {} as IUpcomingStreamsState
);

type IProviderProps = PropsWithChildren<{
  host?: string;
  initial?: PageResponse<Webinar>;
  pageSize?: number;
  category?: number;
  sortBy?: string;
  encryptHackers?: boolean;
}>;

export function UpcomingStreamsProvider({
  host,
  initial,
  pageSize: intialPageSize = 20,
  category,
  sortBy,
  encryptHackers,
  ...rest
}: IProviderProps): JSX.Element {
  const [pageSize, setPageSize] = useState(intialPageSize);
  const [nextPage, setNextPage] = useState(initial?.next ? true : false);
  const {
    data: streams,
    error,
    setSize: setUpcomingStreamsPage,
    mutate: mutateUpcomingStreams,
    isValidating,
  } = useSWRInfinite<PageResponse<Webinar>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      const baseUrl = encryptHackers
        ? API_URL_CONSTANTS.groups.getEncryptHackers
        : API_URL_CONSTANTS.groups.getUpcominWebinars;

      let url = `${baseUrl}?page=${page}&page_size=${pageSize}`;
      if (category) {
        url += `&categories=${category}`;
      }
      if (host) {
        url += `&host=${host}`;
      }
      if (sortBy) {
        url += `&sort_by=${sortBy}`;
      }

      return url;
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

  const value: IUpcomingStreamsState = useMemo(
    () => ({
      upcoming: streams?.flatMap((page) => page.results),
      error,
      loading: !streams && !error,
      nextPage,
      setUpcomingStreamsPage,
      mutateUpcomingStreams,
      setPageSize,
      isValidating,
      category,
      sortBy,
    }),
    [
      streams,
      error,
      nextPage,
      setUpcomingStreamsPage,
      mutateUpcomingStreams,
      setPageSize,
      isValidating,
      category,
      sortBy,
    ]
  );

  return <UpcomingStreamsContext.Provider value={value} {...rest} />;
}

export default function useUpcomingStreams(): IUpcomingStreamsState {
  const context = useContext(UpcomingStreamsContext);

  if (!context) {
    throw new Error("You need to wrap UpcomingStreamProvider.");
  }

  return context;
}
