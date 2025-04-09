import { AxiosResponse } from "axios";
import { AxiosApp } from "../config/Axios";
import { User } from "../models/User";

export class AuthService {
  static register = async (name: string, email: string, password: string): Promise<AxiosResponse> => {
    const body = {name, email, password}
    const resp = await AxiosApp.post<AxiosResponse>(`/taller/auth/register`, body);
    const { data } = resp;
    return data;
  };

  static login = async (email: string, password: string): Promise<User> => {
    const body = { email, password}
    const resp = await AxiosApp.post<User>(`/taller/auth`, body);
    const { data } = resp;
    return data;
  };

  static renewToken = async (): Promise<string> => {
    const resp = await AxiosApp.get<string>(`/taller/auth`);
    const { data } = resp;    
    return data;    
  };
}
