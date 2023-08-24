import axios from "axios";
let baseURL = "http://localhost:2020/v1";
const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export const AxiosPrivateInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
