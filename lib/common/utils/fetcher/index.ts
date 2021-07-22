import { AxiosRequestConfig } from "axios";
import ApiClient from "lib/common/api";

async function fetcher<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const result = await ApiClient({
    method: "GET",
    url,
    ...options,
  });
  return result.data;
}

export default fetcher;
