import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import useAuth from "@/auth/context/AuthContext";
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
  const { user } = useAuth();
  const {
    data: streams,
    error,
    setSize: setStreamCreatorsPage,
  } = useSWRInfinite<PageResponse<Webinar>>(
    (index, previousData) => {
      if (!user) {
        return null;
      }
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
      loading: !!user && !streams && !error,
      setStreamCreatorsPage,
    }),
    [streams, error, setStreamCreatorsPage, user]
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
