import * as React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store/Store";
import { clearErrorState } from "../redux/ErrorSlice/ErrorSlice";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "../views/login/LoginPage";
import { TallerPage } from "../views/taller/TallerPage";
import { CustomError } from "../views/shared/CustomError";
import { MenuAppBar } from "../views/shared/MenuAppBar";
import { clearUserState } from "../redux/userSlice/UserSlice";
import NotFoundPage from "../views/notFound/NotFoundPage";
import RegisterPage from "../views/login/RegisterPage";

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
  const navigate = useNavigate();

  return (
    <>
      {userState.user && (
        <MenuAppBar
          onClick={() => {
            navigate("/register");
          }}
          onClickLogout={() => {
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
          <Route
            path="/register"
            element={
              userState.user && userState.user.role === "admin" ? (
                <RegisterPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorWrapper>
    </>
  );
};

export default RoutesApp;
