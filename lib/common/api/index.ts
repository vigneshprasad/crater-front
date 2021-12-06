import axios, { AxiosInstance } from "axios";
import { getSession, GetSessionOptions, signout } from "next-auth/client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function API(context?: GetSessionOptions): AxiosInstance {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "content-type": "application/json",
    },
  });

  client.interceptors.request.use(async (config) => {
    const session = await getSession(context);
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

  client.interceptors.response.use(async (response) => {
    if (response.status === 401) {
      if (typeof window !== undefined) {
        await signout();
      }
    }
    return response;
  });

  return client;
}
