import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/User";

export interface IUserState {
  readonly loading: boolean;
  readonly user: IUser | null;
  readonly message: string;
  readonly registerStatus: number | null;
}

export const initialState: IUserState = {
  loading: false,
  user: null,
  message: "",
  registerStatus: null,
};

export const UserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLoadingUser: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRegisterStatus: (state, action: PayloadAction<number>) => {
      state.registerStatus = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.message = "";
      state.user = action.payload;
    },
    setMessageUser: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearUserState: () => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
});

export const {
  setLoadingUser,
  setUser,
  setMessageUser,
  clearUserState,
  setRegisterStatus,
} = UserSlice.actions;
