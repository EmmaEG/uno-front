import {configureStore, Store} from '@reduxjs/toolkit';
import { IVehicleFilterSliceState, VehicleFilterSlice} from '../VehicleSlice/VehicleFilterSlice'
import { IVehicleSliceState, VehicleSlice} from '../VehicleSlice/VehicleSlice'
import { ErrorSlice, IErrorSliceState } from '../ErrorSlice/ErrorSlice';

export interface IApplicationState {
  readonly vehicleFilterState: IVehicleFilterSliceState;
  readonly vehicleState: IVehicleSliceState;
  readonly errorState: IErrorSliceState;
}

export const store: Store<IApplicationState> = configureStore({
  reducer: {
    vehicleFilterState: VehicleFilterSlice.reducer,
    vehicleState: VehicleSlice.reducer,
    errorState: ErrorSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,     
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
