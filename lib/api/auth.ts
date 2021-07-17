import { API_URL_CONSTANTS } from "@constants/url.constants";
import { AxiosResponse } from "axios";
import fetcher from "lib/utils/fetcher";

const AuthApiClient = {
  async postPhoneNumber(phoneNumber: string): Promise<AxiosResponse> {
    try {
      const res = await fetcher(API_URL_CONSTANTS.auth.getOtp, {
        method: "POST",
        data: {
          phonenumber: phoneNumber,
        },
      });
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default AuthApiClient;
