import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TallerPage } from "./views/taller/TallerPage";
import { IApplicationState } from "./redux/store/Store";
import {
  clearErrorState,
  IErrorSliceState,
  setEmail,
  setIgnore,
} from "./redux/ErrorSlice/ErrorSlice";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { CustomError } from "./components/CustomError";

const ReduxErrorDialog: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const dispatch =
    useDispatch<ThunkDispatch<IApplicationState, null, UnknownAction>>();

  const errorsState = useSelector<IApplicationState, IErrorSliceState>(
    (state) => state.errorState
  );

  return (
    <>
      {props.children}
      {errorsState.show && (
        <CustomError
          openError={errorsState.show}
          ignoreError={() => {
            dispatch(setIgnore());
          }}
          sendMailError={(descripcion: string) => {
            dispatch(setEmail(descripcion));
            dispatch(clearErrorState());
          }}
        />
      )}
    </>
  );
};

export const App = () => {
  return (
    <ReduxErrorDialog>
      <TallerPage />
    </ReduxErrorDialog>
  );
};
