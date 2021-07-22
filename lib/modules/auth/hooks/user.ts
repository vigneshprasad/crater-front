import { API_URL_CONSTANTS } from "@constants/url.constants";
import fetcher from "lib/common/utils/fetcher";
import { User } from "next-auth";
import useSWR from "swr";

type IUseUserProps = {
  user?: User;
};

type IUseUserResponse = {
  user?: User;
  loading: boolean;
};
export default function useUser({ user }: IUseUserProps): IUseUserResponse {
  const { data, error } = useSWR<User>(
    API_URL_CONSTANTS.auth.getUser,
    fetcher,
    {
      initialData: user,
    }
  );
  const loading = !data && !error;

  return {
    user: data,
    loading,
  };
}
