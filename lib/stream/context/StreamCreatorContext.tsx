import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import { Webinar } from "@/community/types/community";

interface IStreamCreatorState {
  streams?: Webinar[];
  error?: unknown;
  loading: boolean;
  setStreamCreatorsPage: SWRInfiniteResponse<
    PageResponse<Webinar>,
    unknown
  >["setSize"];
}

export const StreamCreatorContext = createContext({} as IStreamCreatorState);

type IProviderProps = PropsWithChildren<{
  initial?: PageResponse<Webinar>;
  pageSize?: number;
}>;

export function StreamCreatorProvider({
  initial,
  pageSize = 10,
  ...rest
}: IProviderProps): JSX.Element {
  const {
    data: streams,
    error,
    setSize: setStreamCreatorsPage,
  } = useSWRInfinite<PageResponse<Webinar>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;
      return `${API_URL_CONSTANTS.conversations.getWebinarCreatorList}?page=${page}&page_size=${pageSize}`;
    },
    {
      initialData: initial ? [initial] : undefined,
    }
  );

  const value: IStreamCreatorState = useMemo(
    () => ({
      streams: streams?.flatMap((page) => page.results),
      error,
      loading: !streams && !error,
      setStreamCreatorsPage,
    }),
    [streams, error, setStreamCreatorsPage]
  );

  return <StreamCreatorContext.Provider value={value} {...rest} />;
}

export default function useStreamCreator(): IStreamCreatorState {
  const context = useContext(StreamCreatorContext);

  if (!context) {
    throw new Error("You need to wrap PastStreamProvider.");
  }

  return context;
}
