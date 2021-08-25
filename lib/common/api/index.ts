import axios from "axios";
import { getSession } from "next-auth/client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

ApiClient.interceptors.request.use(async (config) => {
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

export default ApiClient;
