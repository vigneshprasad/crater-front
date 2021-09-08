import { User } from "next-auth";
import { useContext } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { UserContext } from "../context/UserContext";

// export type IUseUserProps = {};
export type IUseUserState = {
  user?: User;
  loading: boolean;
  error: unknown;
};

export function useUser(): IUseUserState {
  const initial = useContext(UserContext);
  const { data, error } = useSWR<User>(API_URL_CONSTANTS.auth.getUser, {
    initialData: initial,
  });

  return {
    user: data,
    loading: !data && !error,
    error,
  };
}
