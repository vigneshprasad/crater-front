import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { StreamCategory } from "@/creators/types/stream";

interface IStreamCategorySearchState {
  categories?: StreamCategory[];
  error?: unknown;
  isValidating: boolean;
}

export const StreamCategorySearchContext = createContext(
  {} as IStreamCategorySearchState
);

type IProviderProps = PropsWithChildren<{
  initial?: StreamCategory[];
  search?: string;
}>;

export function StreamCategorySearchProvider({
  initial,
  search = "",
  ...rest
}: IProviderProps): JSX.Element {
  const {
    data: categories,
    error,
    isValidating,
  } = useSWR<StreamCategory[]>(
    `${API_URL_CONSTANTS.search.getStreamCategories}?search=${search}`,
    {
      initialData: initial,
    }
  );

  const value: IStreamCategorySearchState = useMemo(
    () => ({
      categories,
      error,
      isValidating,
    }),
    [categories, error, isValidating]
  );

  return <StreamCategorySearchContext.Provider value={value} {...rest} />;
}

export default function useStreamCategorySearchList(): IStreamCategorySearchState {
  const context = useContext(StreamCategorySearchContext);

  if (!context) {
    throw new Error("You need to wrap StreamCategorySearchProvider.");
  }

  return context;
}
