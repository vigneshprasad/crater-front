import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";

import { Series } from "../types/community";

interface ISeriesListState {
  series?: Series[];
  error?: unknown;
  loading: boolean;
  setSeriesListPage: SWRInfiniteResponse<Series[], unknown>["setSize"];
}

export const SeriesListContext = createContext({} as ISeriesListState);

type IProviderProps = PropsWithChildren<{
  host?: string;
  initial?: Series[];
  pageSize?: number;
}>;

export function SeriesListProvider({
  initial,
  pageSize = 10,
  ...rest
}: IProviderProps): JSX.Element {
  const {
    data: series,
    error,
    setSize: setSeriesListPage,
  } = useSWRInfinite<Series[]>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData) return null;

      return `${API_URL_CONSTANTS.series.getAllSeries}?page=${page}&page_size=${pageSize}`;
    },
    async (key: string) => (await fetcher<PageResponse<Series>>(key)).results,
    {
      initialData: initial ? [initial] : undefined,
    }
  );

  const value: ISeriesListState = useMemo(
    () => ({
      series: series?.flat(),
      error,
      loading: !series && !error,
      setSeriesListPage,
    }),
    [series, error, setSeriesListPage]
  );

  return <SeriesListContext.Provider value={value} {...rest} />;
}

export default function useSeries(): ISeriesListState {
  const context = useContext(SeriesListContext);

  if (!context) {
    throw new Error("You need to wrap SeriesListProvider.");
  }

  return context;
}
