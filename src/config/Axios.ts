import axios, * as Axios from "axios";
import { store } from "../redux/store/Store"; 

export const AxiosApp = axios.create({
  baseURL: "https://uno-api-psi.vercel.app/",
});

const whithoutAuth = ["/auth/register", "/auth/login"];


AxiosApp.interceptors.request.use(
  (config: Axios.InternalAxiosRequestConfig) => {
    const currentPath = config.url?.split("?")[0];

    const includeEndpoint = whithoutAuth.some(
      (endpoint) => currentPath === endpoint
    );

    if (!includeEndpoint) {
      const state = store.getState();
      const token = state.userState.user?.token;

      config.headers["x-token"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
