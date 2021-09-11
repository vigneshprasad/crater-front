import { AxiosResponse } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { GroupRequest } from "@/creators/types/community";

interface IApiClientResult {
  getGroupRequest: (groupId: string) => Promise<AxiosResponse<GroupRequest>>;
}

export default function CommunityApiClient(
  context?: GetSessionOptions
): IApiClientResult {
  const client = API(context);

  async function getGroupRequest(
    groupId: string
  ): Promise<AxiosResponse<GroupRequest>> {
    try {
      const res = await client.get<GroupRequest>(
        API_URL_CONSTANTS.groups.retrieveGroup(groupId)
      );
      return res;
    } catch (err) {
      throw new Error(err as string);
    }
  }

  return {
    getGroupRequest,
  };
}
