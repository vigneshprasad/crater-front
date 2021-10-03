import { Profile, Session, User } from "next-auth";
import { useSession } from "next-auth/client";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

interface IAuthState {
  session: Session | null;
  user?: User;
  profile?: Profile;
  loading: boolean;
  error?: unknown;
  mutateProfile: SWRResponse<Profile, unknown>["mutate"];
}

export const AuthContext = createContext({} as IAuthState);

type IProivderProps = PropsWithChildren<{
  user?: User;
  profile?: Profile;
}>;

export function AuthProvider({
  user: initialUser,
  profile: initialProfile,
  ...rest
}: IProivderProps): JSX.Element {
  const [session, sessionLoading] = useSession();

  const { data: user, error: userError } = useSWR<User>(
    session ? API_URL_CONSTANTS.user.user : null,
    {
      initialData: initialUser ?? session?.user,
    }
  );

  const {
    data: profile,
    error: profileError,
    mutate: mutateProfile,
  } = useSWR<Profile>(session ? API_URL_CONSTANTS.user.profile : null, {
    initialData: initialProfile,
  });

  const value: IAuthState = useMemo(
    () => ({
      user,
      profile,
      loading: session
        ? (!user && !userError) || (!profile && !profileError)
        : sessionLoading,
      error: userError || profileError,
      mutateProfile,
      session,
    }),
    [
      user,
      profile,
      sessionLoading,
      userError,
      profileError,
      mutateProfile,
      session,
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
