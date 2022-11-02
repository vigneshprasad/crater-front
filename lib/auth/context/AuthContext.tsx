import { Profile, Session, User } from "next-auth";
import { useSession } from "next-auth/client";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { UserPermission } from "../types/auth";

interface IAuthState {
  session: Session | null;
  user?: User;
  profile?: Profile;
  loading: boolean;
  error?: unknown;
  permission?: UserPermission;
  mutateProfile: SWRResponse<Profile, unknown>["mutate"];
}

export const AuthContext = createContext({} as IAuthState);

type IProivderProps = PropsWithChildren<{
  profile?: Profile;
}>;

export function AuthProvider({
  profile: initialProfile,
  ...rest
}: IProivderProps): JSX.Element {
  const [session, sessionLoading] = useSession();

  const {
    data: profile,
    error: profileError,
    mutate: mutateProfile,
  } = useSWR<Profile>(session ? API_URL_CONSTANTS.user.profile : null, {
    initialData: initialProfile,
  });

  const { data: permission, error: permissionError } = useSWR<UserPermission>(
    session?.user ? API_URL_CONSTANTS.auth.getUserPermission : null
  );

  const value: IAuthState = useMemo(
    () => ({
      user: session?.user,
      profile,
      loading: session ? !profile && !profileError : sessionLoading,
      error: profileError || permissionError,
      mutateProfile,
      session,
      permission,
    }),
    [
      profile,
      sessionLoading,
      profileError,
      mutateProfile,
      session,
      permission,
      permissionError,
    ]
  );

  return <AuthContext.Provider value={value} {...rest} />;
}

export default function useAuth(): IAuthState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("You need to wrap AuthProvider.");
  }

  return context;
}
