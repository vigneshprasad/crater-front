import { AxiosResponse } from "axios";
import { API_URL_CONSTANTS } from "lib/common/constants/url.constants";
import fetcher from "lib/common/utils/fetcher";
import { User } from "next-auth";
import useSWR from "swr";

interface IUserHookResponse {
  data?: User;
  error?: unknown;
  loading: boolean;
}

const useUser = (): IUserHookResponse => {
  const { data, error } = useSWR<AxiosResponse<User>>(
    API_URL_CONSTANTS.auth.getUser,
    fetcher
  );

  return {
    data: data?.data,
    error,
    loading: !data && !error,
  };
};

export default useUser;
