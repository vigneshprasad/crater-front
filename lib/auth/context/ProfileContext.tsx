import { createContext, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Profile } from "../types/auth";

export type IProfileState = {
  profile?: Profile;
  loading: boolean;
  error?: unknown;
  mutateProfile: SWRResponse<Profile, unknown>["mutate"];
};

export const ProfileContext = createContext<IProfileState>({} as IProfileState);

export const ProfileProvider: React.FC<{ initial?: Profile }> = ({
  initial,
  ...rest
}) => {
  const {
    data: profile,
    error,
    mutate: mutateProfile,
  } = useSWR<Profile>(API_URL_CONSTANTS.auth.getProfile, {
    initialData: initial,
  });

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
};
