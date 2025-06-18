import { configureStore } from '@reduxjs/toolkit';
import { VehicleFilterSlice } from '../VehicleSlice/VehicleFilterSlice';
import { VehicleSlice } from '../VehicleSlice/VehicleSlice';
import { ErrorSlice } from '../ErrorSlice/ErrorSlice';
import { UserSlice } from '../userSlice/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const rootReducer = {
  vehicleFilterState: VehicleFilterSlice.reducer,
  vehicleState: VehicleSlice.reducer,
  errorState: ErrorSlice.reducer,
  userState: UserSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // necesario para redux-persist
    }),
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks personalizados para Redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: <T>(selector: (state: RootState) => T) => T = useSelector;