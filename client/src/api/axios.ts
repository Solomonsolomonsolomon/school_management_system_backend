class customAxiosError extends Error {
  message: string;
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
let baseURL = "http://localhost:2020/v1";
const instance = axios.create({
  baseURL: baseURL,
  timeout: 2000,
  headers: { "X-Custom-Header": "foobar" },
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = sessionStorage.getItem("accessToken") || "";
    const role = sessionStorage.getItem("role") || "";

    if (!accessToken || !role) {
      console.log("Token error or missing");
      // You might want to handle this case based on your application logic
    }

    config.headers["Authorization"] = `Bearer ${accessToken}`;
    config.headers["role"] = role;

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized error");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("accessToken");
      location.href = "/";
    }

    return Promise.reject(error);
  }
);

export const AxiosLoginInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar", "Content-Type": "application/json" },
});

export default instance;
