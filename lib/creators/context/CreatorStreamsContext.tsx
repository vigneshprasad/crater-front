import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SWRInfiniteResponse, useSWRInfinite } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";

import { Webinar } from "../../community/types/community";

interface ICreatorStreamsState {
  liveStreams?: Webinar[];
  loading: boolean;
  error?: unknown;
  setPage: SWRInfiniteResponse<Webinar[], unknown>["setSize"];
}

export const CreatorStreamsContext = createContext({} as ICreatorStreamsState);

type IProps = PropsWithChildren<{
  creatorId?: string;
  upcoming?: Webinar[];
  live?: Webinar[];
}>;

export function CreatorStreamProvider({
  creatorId,
  live,
  ...rest
}: IProps): JSX.Element {
  const {
    data: liveStreams,
    setSize,
    error,
  } = useSWRInfinite<Webinar[]>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData) return null;
      return `${API_URL_CONSTANTS.groups.getWebinars}?host=${creatorId}&page=${page}`;
    },
    async (key: string) => (await fetcher<PageResponse<Webinar>>(key)).results,
    { initialData: live ? [[...live]] : undefined }
  );

  const value: ICreatorStreamsState = useMemo(
    () => ({
      liveStreams: liveStreams?.flat(),
      loading: !liveStreams && !error,
      error,
      setPage: setSize,
    }),
    [liveStreams, error, setSize]
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
