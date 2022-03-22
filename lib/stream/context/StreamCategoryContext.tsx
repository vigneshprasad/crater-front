import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { StreamCategory } from "@/creators/types/stream";

interface IStreamCategoryState {
  streamCategories?: StreamCategory[];
  error?: unknown;
  loading: boolean;
}

export const StreamCategoryContext = createContext({} as IStreamCategoryState);

type IProviderProps = PropsWithChildren<{
  initial?: StreamCategory[];
}>;

export function StreamCategoryProvider({
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data: streamCategories, error } = useSWR<StreamCategory[]>(
    `${API_URL_CONSTANTS.stream.getCategories}?show_on_home_page=true`,
    { initialData: initial }
  );

  const value = useMemo(
    () => ({
      streamCategories,
      error,
      loading: !streamCategories && !error,
    }),
    [streamCategories, error]
  );

  return <StreamCategoryContext.Provider value={value} {...rest} />;
}

export default function useStreamCategories(): IStreamCategoryState {
  const context = useContext(StreamCategoryContext);

  if (!context) {
    throw new Error("You need to wrap StreamCategoryProvider.");
  }

  return context;
}
