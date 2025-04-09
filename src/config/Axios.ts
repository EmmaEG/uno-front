import axios, * as Axios from "axios";

export const AxiosApp = axios.create({
  baseURL: "https://uno-api-psi.vercel.app/",
});

const whithoutAuth = ["/auth/register", "/auth/login"];

const getToken = (): string | null => {
  return localStorage.getItem("token");
};

AxiosApp.interceptors.request.use(
  (config: Axios.InternalAxiosRequestConfig) => {
    const currentPath = config.url?.split("?")[0];

    const includeEndpoint = whithoutAuth.some(
      (endpoint) => currentPath === endpoint
    );

    if (!includeEndpoint) {
      config.headers["x-token"] = getToken();
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
