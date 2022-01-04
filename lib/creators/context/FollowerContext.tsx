import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";
import useSWR, { SWRResponse } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import { Follower } from "@/community/types/community";

import CreatorApiClient from "../api";

interface IFollowerState {
  followers?: Follower[];
  error?: unknown;
  loading: boolean;
  mutateFollowers: SWRResponse<PageResponse<Follower>, unknown>["mutate"];
  subscribeCreator: (creator: number) => void;
  unsubscribeCreator: (follower: number) => void;
}

export const FollowerContext = createContext({} as IFollowerState);

type IProviderProps = PropsWithChildren<{
  creator?: number;
  user?: string;
}>;

export function FollowerProvider({
  creator,
  user,
  ...rest
}: IProviderProps): JSX.Element {
  const {
    data: followers,
    error,
    mutate: mutateFollowers,
  } = useSWR<PageResponse<Follower>>(
    creator && user
      ? `${API_URL_CONSTANTS.follower.getFollowersList}?creator=${creator}&user=${user}`
      : null
  );

  const subscribeCreator = useCallback(
    async (creator: number): Promise<void> => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, err] = await CreatorApiClient().subscribeCreator(creator);

      if (err) {
        return;
      }

      mutateFollowers();
    },
    [mutateFollowers]
  );

  const unsubscribeCreator = useCallback(
    async (follower: number): Promise<void> => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, err] = await CreatorApiClient().unsubscribeCreator(
        follower,
        false
      );

      if (err) {
        return;
      }

      mutateFollowers();
    },
    [mutateFollowers]
  );

  const value: IFollowerState = useMemo(
    () => ({
      followers: user ? followers?.results : [],
      error,
      loading: !!user && !followers && !error,
      mutateFollowers,
      subscribeCreator,
      unsubscribeCreator,
    }),
    [
      followers,
      error,
      mutateFollowers,
      subscribeCreator,
      unsubscribeCreator,
      user,
    ]
  );

  return <FollowerContext.Provider value={value} {...rest} />;
}

export function useFollower(): IFollowerState {
  const context = useContext(FollowerContext);

  if (!context) {
    throw new Error("Please use FollowerProvider in tree.");
  }

  return context;
}
