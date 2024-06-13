import {AxiosError} from 'axios';
import {AppDispatch} from '../store/Store';
import { setLoading, setMessage, setVehicles, setVehicle  } from '../VehicleSlice/VehicleSlice'
import { VehicleService } from '../../services/VehicleService';
import { IVehicleFilterSliceState } from './VehicleFilterSlice';
import { Vehicle } from '../../models/Vehicle';

interface IError {
  msg: string;
}

export const getAll = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const resp = await VehicleService.findAll();
      dispatch(setVehicles(resp));
    } catch (error) {
      const {data} = (error as AxiosError<IError>).response!;
      dispatch(setMessage(data.msg));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const get = (vehicleId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const resp = await VehicleService.find(vehicleId);
      dispatch(setVehicle(resp));
    } catch (error) {
      const {data} = (error as AxiosError<IError>).response!;
      dispatch(setMessage(data.msg));
    } finally {
      dispatch(setLoading(false));
    }
  };
};


export const saveVehicle = (vehicle: IVehicleFilterSliceState) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      await VehicleService.save(vehicle);
    } catch (error) {
      const { data } = (error as AxiosError<IError>).response!;
      dispatch(setMessage(data.msg));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateVehicle = (vehicle: Vehicle, vehicleId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      await VehicleService.update(vehicle, vehicleId);
    } catch (error) {
      const {data} = (error as AxiosError<IError>).response!;
      dispatch(setMessage(data.msg));
    } finally {
      dispatch(setLoading(false));
    }
  };
};


export const deleteVehicle = (vehicleId: string ) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await VehicleService.delete(vehicleId);
      let message = res === 200 
        ? "Se ha dado de baja el vehiclo" 
        : "El vehículo no puede darse de baja";        
      dispatch(setMessage(message))
    } catch (error) {
      const { data } = (error as AxiosError<IError>).response!;
      dispatch(setMessage(data.msg))
    } finally {
      dispatch(setLoading(false));
    }
  };
};
