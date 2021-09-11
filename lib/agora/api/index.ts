import { AxiosResponse } from "axios";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

export type IAgoraTokenResponse = {
  token: string;
  channel_name: string;
};

const AgoraApiClient = {
  async getRoomToken(
    channel_id: number
  ): Promise<AxiosResponse<IAgoraTokenResponse>> {
    try {
      const res = await API().post<IAgoraTokenResponse>(
        API_URL_CONSTANTS.agora.getToken,
        {
          channel_id,
        }
      );
      return res;
    } catch (err) {
      throw new Error(err.response.data);
    }
  },
};

export default AgoraApiClient;
