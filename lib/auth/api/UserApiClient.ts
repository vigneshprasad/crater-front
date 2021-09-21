import { AxiosError } from "axios";
import { Profile, User } from "next-auth";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult } from "@/common/types/api";

interface UserPatchResponse {
  token: string;
  user: User;
}

interface IUserApiClient {
  postUserProfile: (
    profile: Partial<Profile>
  ) => Promise<ApiResult<Profile, AxiosError>>;
  postUser: (
    profile: Partial<User>
  ) => Promise<ApiResult<UserPatchResponse, AxiosError>>;
}

export default function UserApiClient(
  context?: GetSessionOptions
): IUserApiClient {
  const client = API(context);

  async function postUserProfile(
    profile: Partial<Profile>
  ): Promise<ApiResult<Profile, AxiosError>> {
    try {
      const { data } = await client.post<Profile>(
        API_URL_CONSTANTS.user.profile,
        profile
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function postUser(
    user: Partial<User>
  ): Promise<ApiResult<UserPatchResponse, AxiosError>> {
    try {
      const { data } = await client.patch<UserPatchResponse>(
        API_URL_CONSTANTS.user.user,
        user
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return {
    postUserProfile,
    postUser,
  };
}
