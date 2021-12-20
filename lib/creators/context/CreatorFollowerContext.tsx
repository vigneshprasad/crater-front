import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";
import { Follower } from "@/community/types/community";

interface IContext {
  pageCount: number;
  followers?: Follower[];
  loading: boolean;
  error: unknown;
  setPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
}

export const CreatorFollowerContext = createContext({} as IContext);

type IProviderProps = PropsWithChildren<{
  pageSize?: number;
  userId: string;
  initial?: Follower[];
}>;

export function CreatorFollowerProvider({
  pageSize = 20,
  initial,
  userId,
  ...rest
}: IProviderProps): JSX.Element {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setPage] = useState(1);
  const { data: followers, error } = useSWR<Follower[]>(
    `${API_URL_CONSTANTS.creator.getCreatorFollowers}?creator__user=${userId}&page=${currentPage}&pageSize=${pageSize}`,
    async (key: string) => {
      const res = await fetcher<PageResponse<Follower>>(key);
      const pageCount = Math.ceil(res.count / pageSize);
      setPageCount(pageCount);
      return res.results;
    },
    { initialData: initial }
  );

  const value = useMemo(
    () => ({
      followers,
      error,
      pageCount,
      loading: !followers && !error,
      setPage,
      currentPage,
    }),
    [followers, error, pageCount, currentPage]
  );

  return <CreatorFollowerContext.Provider value={value} {...rest} />;
}

export default function useCreatorFollowers(): IContext {
  const context = useContext(CreatorFollowerContext);

  if (!context) {
    throw new Error("Please use CreatorFollowerProvider in tree.");
  }

  return context;
}
