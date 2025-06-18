import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { AccountCircle, ArrowBack, ManageAccounts } from "@mui/icons-material";
import { useAppSelector } from "../../redux/store/Store";
import { useLocation, useNavigate } from "react-router-dom";

interface IMenuAppBarProps {
  onClick: () => void;
  onClickLogout: () => void;
}

export const MenuAppBar: React.FC<IMenuAppBarProps> = ({
  onClick,
  onClickLogout,
}) => {
  const userState = useAppSelector((state) => state.userState);
  const navigate = useNavigate();
  const location = useLocation();
  const isOnRegister = location.pathname === "/register";

  return (
    <Box sx={{ flexGrow: 1 }} style={{ borderRadius: 10 }}>
      <AppBar position="static" style={{ borderRadius: 10 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            UNO - Servicio Post Venta
          </Typography>
          <div style={{ display: "flex" }}>
            {userState.user?.role === "admin" && (
              <>
                {isOnRegister && (
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => navigate(-1)}
                    color="inherit"
                    title="Volver"
                  >
                    <span style={{ fontSize: 15, marginRight: 5 }}>Volver</span>
                    <ArrowBack />
                  </IconButton>
                )}
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={onClick}
                  color="inherit"
                  title="Crear nuevo usuario"
                >
                  <span style={{ fontSize: 15, marginRight: 5 }}>Nuevo</span>
                  <ManageAccounts />
                </IconButton>
                <div style={{ width: 15 }} />
              </>
            )}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={onClickLogout}
              color="inherit"
              title="Salir"
            >
              <span style={{ fontSize: 15, marginRight: 5 }}>Salir</span>
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
