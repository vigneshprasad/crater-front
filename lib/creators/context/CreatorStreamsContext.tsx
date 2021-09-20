import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Webinar } from "../types/community";

interface ICreatorStreamsState {
  liveStreams?: Webinar[];
  loading: boolean;
  error?: unknown;
}

export const CreatorStreamsContext = createContext({} as ICreatorStreamsState);

type IProps = PropsWithChildren<{
  creatorId: string;
  upcoming?: Webinar[];
}>;

export function CreatorStreamProvider({
  creatorId,
  ...rest
}: IProps): JSX.Element {
  const { data: liveStreams, error } = useSWR<Webinar[]>(
    `${API_URL_CONSTANTS.groups.getAllLiveWebinars}?host=${creatorId}`
  );

  const value: ICreatorStreamsState = useMemo(
    () => ({
      liveStreams,
      loading: !liveStreams && !error,
      error,
    }),
    [liveStreams, error]
  );
  return <CreatorStreamsContext.Provider value={value} {...rest} />;
}

export default function useCreatorStreams(): ICreatorStreamsState {
  const context = useContext(CreatorStreamsContext);

  if (!context) {
    throw new Error("Please use CreatorStreamProvider in tree.");
  }

  return context;
}
