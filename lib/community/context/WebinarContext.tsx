import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";
import useSWR, { SWRResponse } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import { Webinar } from "@/community/types/community";
import StreamApiClient from "@/stream/api";
import { StreamUpvote } from "@/stream/types/stream";

export interface IWebinarState {
  webinar?: Webinar;
  loading: boolean;
  error?: unknown;
  mutateWebinar: SWRResponse<Webinar, unknown>["mutate"];
  upvoteWebinar: (webinar: Webinar) => Promise<StreamUpvote | null>;
}

export const WebinarContext = createContext({} as IWebinarState);

type IWebinarProviderProps = PropsWithChildren<{
  initial?: Webinar;
  id: string;
}>;

export function WebinarProvider({
  id,
  initial,
  ...rest
}: IWebinarProviderProps): JSX.Element {
  const { track } = useAnalytics();

  const {
    data: webinar,
    error,
    mutate: mutateWebinar,
  } = useSWR<Webinar>(API_URL_CONSTANTS.conversations.retrieveWebinar(id), {
    initialData: initial,
  });

  const upvoteWebinar = useCallback(
    async (webinar: Webinar) => {
      const [streamUpvote] = await StreamApiClient().upvoteStream(webinar.id);
      if (streamUpvote) {
        const newUpvote = !webinar.upvote;
        const newUpvotes = newUpvote
          ? webinar.upvotes + 1
          : webinar.upvotes - 1;

        await mutateWebinar({
          ...webinar,
          upvote: newUpvote,
          upvotes: newUpvotes,
        });

        track(AnalyticsEvents.upvote_stream_clicked, {
          ...streamUpvote,
        });

        return streamUpvote;
      }

      return null;
    },
    [mutateWebinar, track]
  );

  const value: IWebinarState = useMemo(
    () => ({
      webinar,
      error,
      loading: !webinar && !error,
      mutateWebinar,
      upvoteWebinar,
    }),
    [webinar, error, mutateWebinar, upvoteWebinar]
  );
  return <WebinarContext.Provider value={value} {...rest} />;
}

export function useWebinar(): IWebinarState {
  const context = useContext(WebinarContext);

  if (!context) {
    throw new Error("Please use WebinarProvider in tree.");
  }

  return context;
}
