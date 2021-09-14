import { AxiosRequestConfig } from "axios";
import API from "lib/common/api";

async function fetcher<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const result = await API()
    .get<T>(url, { ...options })
    .catch((err) => {
      throw err.response;
    });
  return result.data;
}

export default fetcher;
