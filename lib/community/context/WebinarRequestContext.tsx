import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { GroupRequest } from "@/community/types/community";

interface IWebinarRequestState {
  webinarRequest?: GroupRequest;
  error?: unknown;
  mutateRequest: SWRResponse<GroupRequest, unknown>["mutate"];
}

type IWebinarRequestProviderProps = PropsWithChildren<{
  groupId: string;
  user?: string;
}>;

export const WebinarRequestContext = createContext({} as IWebinarRequestState);

export function WebinarRequestProvider({
  groupId,
  user,
  ...rest
}: IWebinarRequestProviderProps): JSX.Element {
  const {
    data: webinarRequest,
    error,
    mutate: mutateRequest,
  } = useSWR(
    user && groupId
      ? API_URL_CONSTANTS.groups.retrieveGroupRequest(groupId)
      : null,
    {
      shouldRetryOnError: false,
    }
  );

  const value: IWebinarRequestState = useMemo(
    () => ({
      webinarRequest,
      error,
      mutateRequest,
    }),
    [webinarRequest, error, mutateRequest]
  );
  return <WebinarRequestContext.Provider value={value} {...rest} />;
}

export function useWebinarRequest(): IWebinarRequestState {
  const context = useContext(WebinarRequestContext);

  if (!context) {
    throw new Error("Please use WebinarRequestProvider in tree.");
  }

  return context;
}
