import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Webinar } from "@/creators/types/community";

export interface ISessionPageState {
  webinar?: Webinar;
  loading: boolean;
  error?: unknown;
}

export const SessionPageContext = createContext({} as ISessionPageState);

type ISessionPageProviderProps = PropsWithChildren<{
  initial?: Webinar;
  id: string;
}>;

export function SessionPageProvider({
  id,
  initial,
  ...rest
}: ISessionPageProviderProps): JSX.Element {
  const { data: webinar, error } = useSWR<Webinar>(
    API_URL_CONSTANTS.conversations.retrieveGroup(id),
    { initialData: initial }
  );

  const value: ISessionPageState = useMemo(
    () => ({
      webinar,
      error,
      loading: !webinar && !error,
    }),
    [webinar, error]
  );
  return <SessionPageContext.Provider value={value} {...rest} />;
}

export function useSessionPage(): ISessionPageState {
  const context = useContext(SessionPageContext);

  if (!context) {
    throw new Error("Please use SessionPageProvider in tree.");
  }

  return context;
}
