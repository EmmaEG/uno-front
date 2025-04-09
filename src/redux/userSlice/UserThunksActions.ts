import {AppDispatch} from '../store/Store';
import {setLoadingUser, setUser, setMessageUser, setRegisterStatus, clearUserState} from './UserSlice';
import {AxiosError} from 'axios';
import { AuthService } from '../../services/AuthService';

interface IError {
  msg: string;
}

export const loginUser = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingUser(true));
      const resp = await AuthService.login(email, password);
      await localStorage.setItem('token', resp.token);
      dispatch(setUser(resp));
    } catch (error) {
      const { data } = (error as AxiosError<IError>).response!;
      dispatch(setMessageUser(data.msg));
    } finally {
      dispatch(setLoadingUser(false));
    }
  };
};


export const createUser = (name: string, email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingUser(true));
      const resp = await AuthService.register(name, email, password);
      dispatch(setRegisterStatus(resp.status))
    } catch (error) {
      const { data } = (error as AxiosError<IError>).response!;
      dispatch(setMessageUser(data.msg));
    } finally {
      dispatch(setLoadingUser(false));
    }
  };
};

export const renewToken = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await AuthService.renewToken();
      await localStorage.setItem('token', resp);      
    } catch (error) {
      const { data } = (error as AxiosError<IError>).response!;
      dispatch(setMessageUser(data.msg));      
      dispatch(clearUserState());
    }
  };
};
