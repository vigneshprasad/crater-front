import { API_URL_CONSTANTS } from "lib/constants/url.constants";
import fetcher from "lib/utils/fetcher";
import { User } from "next-auth";
import { useSession } from "next-auth/client";
import useSWR from "swr";

interface IUserHookResponse {
  data?: User;
  error?: unknown;
  loading: boolean;
}

const useUser = (): IUserHookResponse => {
  const [session] = useSession();
  const token = session?.user?.apiToken;
  const { data, error } = useSWR(
    token ? [API_URL_CONSTANTS.auth.getUser, token] : null,
    (...props) => fetcher<User>({ ...props })
  );

  return {
    data: data?.data,
    error,
    loading: !data && !error,
  };
};

export default useUser;
