import { User } from "next-auth";
import { useSession } from "next-auth/client";
import { createContext, PropsWithChildren, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

export interface IUserState {
  user?: User;
  loading: boolean;
  error?: unknown;
  mutateUser: SWRResponse<User, unknown>["mutate"];
}

export const UserContext = createContext<IUserState>({} as IUserState);

export type IUserProviderProps = PropsWithChildren<{
  initialData?: User;
}>;

export function UserProvider({
  initialData,
  ...rest
}: IUserProviderProps): JSX.Element {
  const [session, loading] = useSession();
  const {
    data: user,
    error,
    mutate: mutateUser,
  } = useSWR<User>(session ? API_URL_CONSTANTS.user.user : null, {
    initialData: initialData ?? session?.user,
  });

  const value = useMemo(
    () => ({
      user,
      error,
      loading: !user && !error && !loading,
      mutateUser,
    }),
    [user, error, loading, mutateUser]
  );
  return <UserContext.Provider value={value} {...rest} />;
}
