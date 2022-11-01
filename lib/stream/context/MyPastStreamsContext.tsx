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
import { StreamListItem } from "@/community/types/community";

interface IMyPastStreamsState {
  past?: StreamListItem[];
  error?: unknown;
  loading: boolean;
  nextPage: boolean;
  sortBy?: string;
  setMyPastStreamsPage: SWRInfiniteResponse<
    PageResponse<StreamListItem>,
    unknown
  >["setSize"];
  mutateMyPastStreams: SWRInfiniteResponse<
    PageResponse<StreamListItem>,
    unknown
  >["mutate"];
  setPageSize: Dispatch<SetStateAction<number>>;
  category?: number;
}

export const MyPastStreamsContext = createContext({} as IMyPastStreamsState);

type IProviderProps = PropsWithChildren<{
  host?: string;
  initial?: PageResponse<StreamListItem>;
  pageSize?: number;
  sortBy?: string;
}>;

export function MyPastStreamsProvider({
  initial,
  host,
  pageSize: intialPageSize = 10,
  sortBy,
  ...rest
}: IProviderProps): JSX.Element {
  const [pageSize, setPageSize] = useState(intialPageSize);
  const [nextPage, setNextPage] = useState(initial?.next ? true : false);
  const {
    data: streams,
    error,
    setSize: setMyPastStreamsPage,
    mutate: mutateMyPastStreams,
  } = useSWRInfinite<PageResponse<StreamListItem>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      if (!host) return null;

      const baseUrl = API_URL_CONSTANTS.stream.getMyPastStreams;

      let url = `${baseUrl}?page=${page}&page_size=${pageSize}`;

      if (sortBy) {
        url += `&sort_by=${sortBy}`;
      }

      return url;
    },
    async (key: string) => {
      const response = await fetcher<PageResponse<StreamListItem>>(key);
      !response.next ? setNextPage(false) : setNextPage(true);
      return response;
    },
    {
      initialData: initial ? [initial] : undefined,
    }
  );

  const value: IMyPastStreamsState = useMemo(
    () => ({
      past: streams?.flatMap((page) => page.results),
      error,
      loading: !streams && !error,
      nextPage,
      setMyPastStreamsPage,
      mutateMyPastStreams,
      setPageSize,
      sortBy,
    }),
    [
      streams,
      error,
      nextPage,
      setMyPastStreamsPage,
      mutateMyPastStreams,
      setPageSize,
      sortBy,
    ]
  );

  return <MyPastStreamsContext.Provider value={value} {...rest} />;
}

export default function useMyPastStreams(): IMyPastStreamsState {
  const context = useContext(MyPastStreamsContext);

  if (!context) {
    throw new Error("You need to wrap MyPastStreamsProvider.");
  }

  return context;
}
