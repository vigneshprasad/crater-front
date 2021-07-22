import { AxiosResponse } from "axios";
import ApiClient from "lib/common/api";
import { API_URL_CONSTANTS } from "lib/common/constants/url.constants";

const AuthApiClient = {
  async getPhoneOtp(phoneNumber: string): Promise<AxiosResponse> {
    try {
      const res = await ApiClient({
        url: API_URL_CONSTANTS.auth.getOtp,
        method: "POST",
        data: {
          username: phoneNumber,
        },
      });
      return res;
    } catch (error) {
      const data = JSON.stringify(error.response.data);
      throw new Error(data);
    }
  },
};

export default AuthApiClient;
