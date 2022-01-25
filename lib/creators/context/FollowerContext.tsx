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
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
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
  const { track } = useAnalytics();

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
      const [follower, err] = await CreatorApiClient().subscribeCreator(
        creator
      );

      if (err) {
        return;
      }

      mutateFollowers();

      track(AnalyticsEvents.subscribe_creator, {
        ...follower,
      });
    },
    [mutateFollowers, track]
  );

  const unsubscribeCreator = useCallback(
    async (followerId: number): Promise<void> => {
      const [follower, err] = await CreatorApiClient().unsubscribeCreator(
        followerId,
        false
      );

      if (err) {
        return;
      }

      mutateFollowers();

      track(AnalyticsEvents.unsubscribe_creator, {
        ...follower,
      });
    },
    [mutateFollowers, track]
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
