import { AxiosApp } from "../config/Axios";
import { Vehicle } from "../models/Vehicle";
import { IVehicleFilterSliceState } from "../redux/VehicleSlice/VehicleFilterSlice";

export class VehicleService {
  static findAll = async (): Promise<Vehicle[]> => {
    const resp = await AxiosApp.get<Vehicle[]>(`/taller/vehicle`);
    const { data } = resp;
    let vehicles: Vehicle[] = [];
    data.forEach((e) => {
      vehicles.push(new Vehicle(e));
    });
    return vehicles;
  };

  static find = async (vehicleId: string): Promise<Vehicle> => {
    const resp = await AxiosApp.get<Vehicle>(`/taller/vehicle/${vehicleId}`);
    const { data } = resp;
    return data;
  };

  static save = async (vehicle: IVehicleFilterSliceState): Promise<Vehicle> => {
    const body = {
      marca: vehicle.marca,
      patente: vehicle.patente,
      kilometraje: vehicle.kilometraje,
      nMotor: vehicle.nMotor,
      nChasis: vehicle.nChasis,
      servicio: vehicle.servicio,
      estado: vehicle.estado,
    };
    const resp = await AxiosApp.post<Vehicle>(`/taller/vehicle/`, body);
    const { data } = resp;
    return data;
  };

  static delete = async (vehicleId: string): Promise<number> => {
    const resp = await AxiosApp.delete<number>(`/taller/vehicle/${vehicleId}`);
    const { status } = resp;
    return status;
  };

  static update = async (
    vehicle: Vehicle,
    vehicleId: string
  ): Promise<Vehicle> => {
    const body = {
      marca: vehicle.marca,
      servicio: vehicle.servicio,
      estado: vehicle.estado,
      patente: vehicle.patente,
      km: vehicle.kilometraje,
      nMotor: vehicle.nMotor,
      nChasis: vehicle.nChasis,
    };
    const resp = await AxiosApp.put<Vehicle>(`/taller/vehicle/${vehicleId}`, body);
    const { data } = resp;
    return data;
  };
}
