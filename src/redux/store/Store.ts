import { configureStore } from '@reduxjs/toolkit';
import { VehicleFilterSlice } from '../VehicleSlice/VehicleFilterSlice';
import { VehicleSlice } from '../VehicleSlice/VehicleSlice';
import { ErrorSlice } from '../ErrorSlice/ErrorSlice';
import { UserSlice } from '../userSlice/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const userPersistConfig = {
  key: 'userState',
  storage,
  whitelist: ['user'],
};

const persistedUserReducer = persistReducer(userPersistConfig, UserSlice.reducer);

const rootReducer = {
  vehicleFilterState: VehicleFilterSlice.reducer,
  vehicleState: VehicleSlice.reducer,
  errorState: ErrorSlice.reducer,
  userState: persistedUserReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // necesario para redux-persist
    }),
});

export const persistor = persistStore(store);

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks personalizados para Redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: <T>(selector: (state: RootState) => T) => T = useSelector;