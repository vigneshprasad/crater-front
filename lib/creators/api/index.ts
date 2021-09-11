import { AxiosResponse } from "axios";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

const CreatorApiClient = {
  async getCratorsList(): Promise<AxiosResponse> {
    try {
      const res = await API().get(API_URL_CONSTANTS.creator.getCreatorList);
      return res;
    } catch (e) {
      throw new Error(e as string);
    }
  },
};

export default CreatorApiClient;
