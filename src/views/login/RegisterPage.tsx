import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store/Store";
import { createUser } from "../../redux/userSlice/UserThunksActions";
import { useNavigate } from "react-router-dom";
import { setRegisterStatus } from "../../redux/userSlice/UserSlice";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.userState);
  const navigate = useNavigate();

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [nameError, setNameError] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  React.useEffect(() => {
    if (userState.registerStatus === 201) {
      dispatch(setRegisterStatus(0));
      navigate(-1);
    }
  }, [userState.registerStatus]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: 5,
        alignItems: "center",
        height: "100vh",
      }}
    >
      {userState.loading && (
        <div
          style={{
            position: "absolute",
            zIndex: 9999,
            height: "100%",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          >
            <CircularProgress color="inherit" />
          </div>
        </div>
      )}
      <Paper
        elevation={3}
        sx={{ padding: 10, width: "100%", textAlign: "center", maxWidth: 400 }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Crear Nuevo Usuario
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Name"
            variant="outlined"
            placeholder="Juan Perez"
            required
            fullWidth
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setName(value);
              setNameError(value.length < 3);
            }}
            type="text"
            error={nameError}
            helperText={
              nameError
                ? "Por favor, ingresá nombre y apellido, debe tener mínimo 3 caracteres."
                : ""
            }
          />
          <TextField
            label="Email"
            variant="outlined"
            required
            fullWidth
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setEmail(value);
              setEmailError(!validateEmail(value));
            }}
            type="email"
            error={emailError}
            helperText={emailError ? "Por favor, ingresá un email válido." : ""}
          />
          <TextField
            label="Contraseña"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            type={"password"}
            required
            variant="outlined"
            fullWidth
            error={password.length < 6}
            helperText={
              password.length < 6
                ? "El password debe tener mínimo 6 caracteres"
                : ""
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (
                e.key === "Enter" &&
                email.length !== 0 &&
                password.length !== 0 &&
                name.length < 3 &&
                !emailError
              ) {
                dispatch(createUser(name, email, password));
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ height: 45 }}
            disabled={
              email.length === 0 ||
              password.length < 6 ||
              name.length < 3 ||
              emailError
            }
            onClick={() => {
              dispatch(createUser(name, email, password));
            }}
          >
            Registrar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
