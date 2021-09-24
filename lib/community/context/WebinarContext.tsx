import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Webinar } from "@/community/types/community";

export interface IWebinarState {
  webinar?: Webinar;
  loading: boolean;
  error?: unknown;
  mutateWebinar: SWRResponse<Webinar, unknown>["mutate"];
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
  const {
    data: webinar,
    error,
    mutate: mutateWebinar,
  } = useSWR<Webinar>(API_URL_CONSTANTS.conversations.retrieveGroup(id), {
    initialData: initial,
  });

  const value: IWebinarState = useMemo(
    () => ({
      webinar,
      error,
      loading: !webinar && !error,
      mutateWebinar,
    }),
    [webinar, error, mutateWebinar]
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
