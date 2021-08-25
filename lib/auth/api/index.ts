import { AxiosResponse } from "axios";

import ApiClient from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { UserProfile } from "../types/auth";

const AuthApiClient = {
  async getPhoneOtp(
    phoneNumber: string
  ): Promise<AxiosResponse<{ message: string }>> {
    try {
      const res = await ApiClient({
        method: "POST",
        url: API_URL_CONSTANTS.auth.getOtp,
        data: {
          username: phoneNumber,
        },
      });
      return res;
    } catch (err) {
      throw new Error(err.response.data);
    }
  },
  async getUserProfile(pk: string): Promise<AxiosResponse<UserProfile>> {
    try {
      const res = await ApiClient({
        method: "GET",
        url: `${API_URL_CONSTANTS.network.getUserProfile}${pk}/`,
      });
      return res;
    } catch (err) {
      throw new Error(err.response.data);
    }
  },
};

export default AuthApiClient;
