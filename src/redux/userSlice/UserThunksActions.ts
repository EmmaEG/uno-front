import {AppDispatch} from '../store/Store';
import {setLoadingUser, setUser, setMessageUser, setRegisterStatus, clearUserState, setNewToken} from './UserSlice';
import {AxiosError} from 'axios';
import { AuthService } from '../../services/AuthService';
import { setShow } from "../ErrorSlice/ErrorSlice";

interface IError {
  msg: string;
}

export const loginUser = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingUser(true));
      const resp = await AuthService.login(email, password);
      dispatch(setUser(resp));
    } catch (error) {
      const { data, status } = (error as AxiosError<IError>).response!;
      if (status === 400) {
        return dispatch(setMessageUser("Verifique sus credenciales"));
      }
      dispatch(setMessageUser(data.msg));
      dispatch(setShow(true));
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
      dispatch(setRegisterStatus(resp))
    } catch (error) {
      const { data } = (error as AxiosError<IError>).response!;
      dispatch(setMessageUser(data.msg));
      dispatch(setShow(true));
    } finally {
      dispatch(setLoadingUser(false));
    }
  };
};

export const renewToken = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await AuthService.renewToken();
      const nuevoToken = resp;
      dispatch(setNewToken(nuevoToken));
    } catch (error) {
      const { data } = (error as AxiosError<IError>).response!;
      dispatch(setMessageUser(data.msg));      
      dispatch(clearUserState());
    }
  };
};
