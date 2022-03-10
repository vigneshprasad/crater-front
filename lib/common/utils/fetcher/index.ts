import { AxiosRequestConfig } from "axios";
import API from "lib/common/api";
import { signout } from "next-auth/client";

async function fetcher<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const result = await API()
    .get<T>(url, { ...options })
    .catch((err) => {
      if (err.response.status === 401) signout();
      throw err.response;
    });
  return result.data;
}

export default fetcher;
