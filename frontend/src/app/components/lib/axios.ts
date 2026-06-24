import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const impersonationToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("impersonationToken")
      : null;

  if (impersonationToken) {
    config.headers.Authorization = `Bearer ${impersonationToken}`;
  }

  return config;
});

export default api;
