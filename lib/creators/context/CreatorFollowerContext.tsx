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
import { Follower } from "@/community/types/community";

interface ICreatorFollowersState {
  followers?: Follower[];
  followerPages?: PageResponse<Follower>[];
  loading: boolean;
  error: unknown;
  nextPage: boolean;
  pageSize: number;
  setCreatorFollowersPage: SWRInfiniteResponse<
    PageResponse<Follower>,
    unknown
  >["setSize"];
  setPageSize: Dispatch<SetStateAction<number>>;
}

export const CreatorFollowerContext = createContext(
  {} as ICreatorFollowersState
);

type IProviderProps = PropsWithChildren<{
  pageSize?: number;
  userId?: string;
  initial?: PageResponse<Follower>;
}>;

export function CreatorFollowerProvider({
  pageSize: initialPageSize = 10,
  initial,
  userId,
  ...rest
}: IProviderProps): JSX.Element {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [nextPage, setNextPage] = useState(initial?.next ? true : false);

  const {
    data: followers,
    error,
    setSize: setCreatorFollowersPage,
  } = useSWRInfinite<PageResponse<Follower>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;

      return `${API_URL_CONSTANTS.creator.getCreatorFollowers}?creator__user=${userId}&page=${page}&page_size=${pageSize}`;
    },
    async (key: string) => {
      const response = await fetcher<PageResponse<Follower>>(key);
      !response.next ? setNextPage(false) : setNextPage(true);
      return response;
    },
    {
      initialData: initial ? [initial] : undefined,
    }
  );

  const value: ICreatorFollowersState = useMemo(
    () => ({
      followers: followers?.flatMap((page) => page.results),
      followerPages: followers,
      error,
      loading: !followers && !error,
      nextPage,
      pageSize,
      setCreatorFollowersPage,
      setPageSize,
    }),
    [followers, error, nextPage, pageSize, setCreatorFollowersPage, setPageSize]
  );

  return <CreatorFollowerContext.Provider value={value} {...rest} />;
}

export default function useCreatorFollowers(): ICreatorFollowersState {
  const context = useContext(CreatorFollowerContext);

  if (!context) {
    throw new Error("Please use CreatorFollowerProvider in tree.");
  }

  return context;
}
