"use server";

import axios from "axios";
import { cookies } from "next/headers";

const apiClient = axios.create({
  baseURL: process.env.PROD_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the token to every request if available
apiClient.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
