import { AxiosResponse } from "axios";

import ApiClient from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { CoverFile, Profile } from "../types/auth";

const AuthApiClient = {
  async getPhoneOtp(
    phoneNumber: string
  ): Promise<AxiosResponse<{ message: string }>> {
    try {
      const res = await ApiClient.post<{ message: string }>(
        API_URL_CONSTANTS.auth.getOtp,
        {
          username: phoneNumber,
        }
      );
      return res;
    } catch (err) {
      throw new Error(err.response.data);
    }
  },
  async getUserProfile(pk: string): Promise<AxiosResponse<Profile>> {
    try {
      const res = await ApiClient.get<Profile>(
        `${API_URL_CONSTANTS.network.getUserProfile}${pk}/`
      );
      return res;
    } catch (err) {
      throw new Error(err.response.data);
    }
  },
  async postUserCoverFile(
    file: FileReader["result"]
  ): Promise<AxiosResponse<CoverFile>> {
    try {
      const res = await ApiClient.post<CoverFile>(
        API_URL_CONSTANTS.auth.postProfileCoverFile,
        {
          file_base64: file,
        }
      );

      return res;
    } catch (err) {
      throw new Error(err.response.data);
    }
  },
  async postUserProfile(data: Profile): Promise<AxiosResponse> {
    try {
      const res = await ApiClient.post<Profile>(
        API_URL_CONSTANTS.user.profile,
        data
      );
      return res;
    } catch (err) {
      throw new Error(err.response.data);
    }
  },
};

export default AuthApiClient;
