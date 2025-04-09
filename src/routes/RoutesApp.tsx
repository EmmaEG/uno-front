import * as React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store/Store";
import { clearErrorState } from "../redux/ErrorSlice/ErrorSlice";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "../views/login/LoginPage";
import { TallerPage } from "../views/taller/TallerPage";
import { CustomError } from "../components/CustomError";
import { MenuAppBar } from "../components/MenuAppBar";
import { clearUserState } from "../redux/userSlice/UserSlice";

interface IErrorWrapper {
  children: React.ReactNode;
}

const ErrorWrapper: React.FC<IErrorWrapper> = (props) => {
  const dispatch = useAppDispatch();
  const errorsState = useAppSelector((state) => state.errorState);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
      {errorsState.show && (
        <>
          <CustomError
            ignoreError={() => {
              dispatch(clearErrorState());
            }}
            openError={errorsState.show}
            sendMailError={() => {
              dispatch(clearErrorState());
            }}
          />
        </>
      )}
    </div>
  );
};

export const RoutesApp: React.FC = () => {
  const userState = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  return (
    <Router>
      {userState.user && (
        <MenuAppBar
          onClick={() => {
            dispatch(clearUserState());
          }}
        />
      )}

      <ErrorWrapper>
        <Routes>
          <Route
            path="/"
            element={
              userState.user ? <TallerPage /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ErrorWrapper>
    </Router>
  );
};

export default RoutesApp;
