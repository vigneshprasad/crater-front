import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.user?.apiToken;
  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `JWT ${token}`,
      },
    };
  }
  return config;
});

async function fetcher<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const result = await apiClient({
    method: "GET",
    url,
    ...options,
  });
  return result;
}

export default fetcher;
