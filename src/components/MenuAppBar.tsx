import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

interface IMenuAppBarProps {
  onClick: () => void;
}

export const MenuAppBar: React.FC<IMenuAppBarProps> = ({ onClick }) => {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ borderRadius: 10 }}>
      <AppBar position="static" style={{ borderRadius: 10 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            UNO - Servicio Post Venta
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={onClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
