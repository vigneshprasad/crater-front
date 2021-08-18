import { AxiosResponse } from "axios";

import ApiClient from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

const CreatorApiClient = {
  async getCratorsList(): Promise<AxiosResponse> {
    try {
      const res = ApiClient({
        method: "get",
        url: API_URL_CONSTANTS.creator.getCreatorList,
      });
      return await res;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default CreatorApiClient;
