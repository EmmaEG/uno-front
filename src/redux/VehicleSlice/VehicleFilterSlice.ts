import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IVehicleFilterSliceState {
  readonly marca: string;
  readonly servicio: string;
  readonly estado: string;
  readonly patente: string;
  readonly kilometraje: string;
  readonly nMotor: string;
  readonly nChasis: string;
}

export const initialState: IVehicleFilterSliceState = {
  marca: "",
  servicio: "",
  estado: "",
  patente: "",
  kilometraje: "",
  nMotor: "",
  nChasis: "",
};

export const VehicleFilterSlice = createSlice({
  name: "vehicleFilter",
  initialState,
  reducers: {
    setMarca: (state, action: PayloadAction<string>) => {
      state.marca = action.payload;
    },
    setServicio: (state, action: PayloadAction<string>) => {
      state.servicio = action.payload;
    },
    setEstado: (state, action: PayloadAction<string>) => {
      state.estado = action.payload;
    },
    setPatente: (state, action: PayloadAction<string>) => {
      state.patente = action.payload.toUpperCase();
    },
    setKm: (state, action: PayloadAction<string>) => {
      state.kilometraje = action.payload.toUpperCase();
    },
    setMotor: (state, action: PayloadAction<string>) => {
      state.nMotor = action.payload.toUpperCase();
    },
    setChasis: (state, action: PayloadAction<string>) => {
      state.nChasis = action.payload.toUpperCase();
    },
    clearFilterState: () => {
      return initialState;
    },
  },
});

export const {
  setMarca,
  setServicio,
  setEstado,
  setPatente,
  setKm,
  setMotor,
  setChasis,
  clearFilterState,
} = VehicleFilterSlice.actions;
