import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IErrorSliceState {
  readonly show: boolean;
  readonly message: any;
}

export const initialState: IErrorSliceState = {
  show: false,
  message: "",
};

export const ErrorSlice = createSlice({
  name: "ErrorSlice",
  initialState,
  reducers: {
    setIgnore: () => {
      return initialState;
    },
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearErrorState: () => {
      return initialState;
    },
  },
});

export const { setIgnore, setShow, setEmail, clearErrorState } = ErrorSlice.actions;
