import { createContext, PropsWithChildren, useContext, useMemo } from "react";
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

  const subscribeCreator = async (creator: number): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [res, err] = await CreatorApiClient().subscribeCreator(creator);

    if (err) {
      return;
    }

    mutateFollowers();
  };

  const unsubscribeCreator = async (follower: number): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [res, err] = await CreatorApiClient().unsubscribeCreator(
      follower,
      false
    );

    if (err) {
      return;
    }

    mutateFollowers();
  };

  const value: IFollowerState = useMemo(
    () => ({
      followers: followers?.results,
      error,
      loading: !followers && !error,
      mutateFollowers,
      subscribeCreator,
      unsubscribeCreator,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [followers, error, mutateFollowers]
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
