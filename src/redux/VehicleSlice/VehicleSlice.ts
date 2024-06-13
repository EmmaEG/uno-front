import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vehicle } from "../../models/Vehicle";

export interface IVehicleSliceState {
  readonly rows: Vehicle[];
  readonly row: Vehicle | null;
  readonly loading: boolean;
  readonly message: string;
}

export const initialState: IVehicleSliceState = {
  rows: [],
  row: null,
  loading: false,
  message: ''
};

export const VehicleSlice = createSlice({
  name: "vehicleSlice",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.rows = action.payload;
    },
    setVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.row = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearVehicleState: () => {
      return initialState;
    },
  },
});

export const { setLoading, setVehicle, clearVehicleState, setMessage, setVehicles } = VehicleSlice.actions;
