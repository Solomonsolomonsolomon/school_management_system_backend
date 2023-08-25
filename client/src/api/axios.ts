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
    try {
      console.log("hit");
      config.headers = config.headers || {};
      let accessToken: string = sessionStorage.getItem("accessToken") || "";
      let role: string = sessionStorage.getItem("role") || "";
      if (!accessToken || !role) console.log("token error");
      //throw new customAxiosError("login and get token and role", 404);
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      config.headers["role"] = role;
      config.headers["Content-Type"] = "application/json";
      return config;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  (error: any) => {
    if (error?.statusCode == 404) location.href = "/login";
    console.log(error?.message);
  }
);
instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log("here an err occured");
    if (error.response?.status == 401) {
      console.log("hit here thats why");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("accessToken");
      location.href = "/";
    }
  }
);
export const AxiosLoginInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar", "Content-Type": "application/json" },
});

export default instance;
