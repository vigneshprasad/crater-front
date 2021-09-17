import { useSession } from "next-auth/client";
import { createContext, PropsWithChildren, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Profile } from "../types/auth";

export interface IProfileState {
  profile?: Profile;
  loading: boolean;
  error?: unknown;
  mutateProfile: SWRResponse<Profile, unknown>["mutate"];
}

export const ProfileContext = createContext<IProfileState>({} as IProfileState);

export type IProfileProviderProps = PropsWithChildren<{
  initial?: Profile;
}>;

export function ProfileProvider({
  initial,
  ...rest
}: IProfileProviderProps): JSX.Element {
  const [session] = useSession();
  const {
    data: profile,
    error,
    mutate: mutateProfile,
  } = useSWR<Profile>(
    session && session.user ? API_URL_CONSTANTS.auth.getProfile : null,
    {
      initialData: initial,
    }
  );

  const value: IProfileState = useMemo(
    () => ({
      profile,
      error,
      loading: !profile && !error,
      mutateProfile,
    }),
    [profile, error, mutateProfile]
  );
  return <ProfileContext.Provider value={value} {...rest} />;
}
