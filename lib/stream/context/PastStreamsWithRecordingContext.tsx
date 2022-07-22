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
import { PastStreamListItemWithRecording } from "@/community/types/community";

export interface IPastStreamsWithRecordingState {
  streams?: PastStreamListItemWithRecording[];
  error?: unknown;
  loading: boolean;
  setPastStreamsWithRecording: SWRInfiniteResponse<
    PageResponse<PastStreamListItemWithRecording>,
    unknown
  >["setSize"];
  setPageSize: Dispatch<SetStateAction<number>>;
  nextPage?: boolean;
  category?: number;
}

export const PastStreamsWithRecordingContext = createContext(
  {} as IPastStreamsWithRecordingState
);

type IProviderProps = PropsWithChildren<{
  host?: string;
  initial?: PageResponse<PastStreamListItemWithRecording>;
  pageSize?: number;
  category?: number;
}>;

export function PastStreamsWithRecordingProvider({
  host,
  initial,
  pageSize: intialPageSize = 5,
  category,
  ...rest
}: IProviderProps): JSX.Element {
  const [pageSize, setPageSize] = useState(intialPageSize);
  const [nextPage, setNextPage] = useState(false);
  const {
    data: streams,
    error,
    setSize: setPastStreamsWithRecording,
  } = useSWRInfinite<PageResponse<PastStreamListItemWithRecording>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      if (host) {
        return `${API_URL_CONSTANTS.groups.getAllVideos}?host=${host}&page=${page}&page_size=${pageSize}`;
      }

      if (category) {
        return `${API_URL_CONSTANTS.groups.getAllVideos}?categories=${category}&page=${page}&page_size=${pageSize}`;
      }

      return `${API_URL_CONSTANTS.groups.getAllVideos}?page=${page}&page_size=${pageSize}`;
    },
    async (key: string) => {
      const response = await fetcher<
        PageResponse<PastStreamListItemWithRecording>
      >(key);
      !response.next ? setNextPage(false) : setNextPage(true);
      return response;
    },
    {
      initialData: initial ? [initial] : undefined,
    }
  );

  const value: IPastStreamsWithRecordingState = useMemo(
    () => ({
      streams: streams?.flatMap((page) => page.results),
      error,
      loading: !streams && !error,
      nextPage,
      category,
      setPastStreamsWithRecording,
      setPageSize,
    }),
    [
      streams,
      error,
      nextPage,
      category,
      setPastStreamsWithRecording,
      setPageSize,
    ]
  );

  return <PastStreamsWithRecordingContext.Provider value={value} {...rest} />;
}

export default function usePastStreamsWithRecording(): IPastStreamsWithRecordingState {
  const context = useContext(PastStreamsWithRecordingContext);

  if (!context) {
    throw new Error("You need to wrap PastStreamsWithRecordingProvider.");
  }

  return context;
}
