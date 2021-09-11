import { AxiosRequestConfig } from "axios";
import API from "lib/common/api";

async function fetcher<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const result = await API().get(url, { ...options });
  return result.data;
}

export default fetcher;
