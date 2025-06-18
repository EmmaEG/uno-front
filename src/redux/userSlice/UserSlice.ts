import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";

export interface IUserState {
  readonly loading: boolean;
  readonly user: User | null;
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
    setUser: (state, action: PayloadAction<User>) => {
      state.message = "";
      state.user = action.payload;
    },
    setNewToken(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.token = action.payload;
      }
    },
    setMessageUser: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearUserState: () => {
      return initialState;
    },
  },
});

export const {
  setLoadingUser,
  setUser,
  setNewToken,
  setMessageUser,
  clearUserState,
  setRegisterStatus,
} = UserSlice.actions;
