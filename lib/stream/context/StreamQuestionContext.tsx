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

import { StreamQuestion } from "../types/stream";

export interface IStreamQuestionState {
  streamQuestions?: StreamQuestion[];
  error?: unknown;
  loading: boolean;
  nextPage: boolean;
  setStreamQuestionsPage: SWRInfiniteResponse<
    PageResponse<StreamQuestion>,
    unknown
  >["setSize"];
  mutateStreamQuestionsPage: SWRInfiniteResponse<
    PageResponse<StreamQuestion>,
    unknown
  >["mutate"];
}

export const StreamQuestionContext = createContext({} as IStreamQuestionState);

type IProviderProps = PropsWithChildren<{
  group: number;
  initial?: PageResponse<StreamQuestion>;
  pageSize?: number;
}>;

export function StreamQuestionProvider({
  group,
  initial,
  pageSize = 5,
  ...rest
}: IProviderProps): JSX.Element {
  const [nextPage, setNextPage] = useState(initial?.next ? true : false);
  const {
    data: streamQuestions,
    error,
    setSize: setStreamQuestionsPage,
    mutate: mutateStreamQuestionsPage,
  } = useSWRInfinite<PageResponse<StreamQuestion>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      return `${API_URL_CONSTANTS.groups.getGroupQuestions}?group=${group}&page=${page}&page_size=${pageSize}`;
    },
    async (key: string) => {
      const response = await fetcher<PageResponse<StreamQuestion>>(key);
      !response.next ? setNextPage(false) : setNextPage(true);
      return response;
    },
    {
      initialData: initial ? [initial] : undefined,
    }
  );

  const value: IStreamQuestionState = useMemo(
    () => ({
      streamQuestions: streamQuestions?.flatMap((page) => page.results),
      error,
      loading: !streamQuestions && !error,
      nextPage,
      setStreamQuestionsPage,
      mutateStreamQuestionsPage,
    }),
    [
      streamQuestions,
      error,
      nextPage,
      setStreamQuestionsPage,
      mutateStreamQuestionsPage,
    ]
  );

  return <StreamQuestionContext.Provider value={value} {...rest} />;
}

export default function useStreamQuestions(): IStreamQuestionState {
  const context = useContext(StreamQuestionContext);

  if (!context) {
    throw new Error("You need to wrap StreamQuestionProvider.");
  }

  return context;
}
