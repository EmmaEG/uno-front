import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVehicle,
  getAll,
  updateVehicle,
} from "../../redux/VehicleSlice/VehicleThunksActions";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { IApplicationState } from "../../redux/store/Store";
import { IVehicleSliceState } from "../../redux/VehicleSlice/VehicleSlice";
import { Vehicle } from "../../models/Vehicle";

export const TallerTable = () => {
  const dispatch =
    useDispatch<ThunkDispatch<IApplicationState, null, UnknownAction>>();

  const vehicleState = useSelector<IApplicationState, IVehicleSliceState>(
    (state) => state.vehicleState
  );

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selected, setSelected] = React.useState<Vehicle | null>(null);
  const [cahnged, setChanged] = React.useState(false);

  React.useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const handleDelete = async () => {
    if (selected) {
      await dispatch(deleteVehicle(selected.id));
      dispatch(getAll());
      setOpenDelete(false);
      setSelected(null);
    }
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof Vehicle;
    const value = e.target.value;

    if (selected) {
      setSelected({
        ...selected,
        [name]: value.toUpperCase(),
      });
      setChanged(true);
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const name = e.target.name as keyof Vehicle;
    const value = e.target.value;

    if (selected) {
      setSelected({
        ...selected,
        [name]: value,
      });
      setChanged(true);
    }
  };

  const handleEdit = async () => {
    if (selected) {
      await dispatch(updateVehicle(selected, selected.id));
      dispatch(getAll());
      setOpenEdit(false);
      setSelected(null);
      setChanged(false);
    }
  };

  const handleEditOpen = (row: Vehicle) => {
    setSelected(row);
    setOpenEdit(true);
    setChanged(false);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        width: "auto",
      },
    },
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table" stickyHeader>
          <TableHead>
            <TableRow
              style={{
                background: "rgba(76, 76, 76, 0.26)",
                whiteSpace: "nowrap",
              }}
            >
              <TableCell style={{ fontWeight: "bold", minWidth: 100 }}>
                Marca
              </TableCell>
              <TableCell style={{ fontWeight: "bold", minWidth: 90 }}>
                Patente
              </TableCell>
              <TableCell style={{ fontWeight: "bold", minWidth: 90 }}>
                Kilometraje
              </TableCell>
              <TableCell style={{ fontWeight: "bold", minWidth: 100 }}>
                Nº Motor
              </TableCell>
              <TableCell style={{ fontWeight: "bold", minWidth: 100 }}>
                Nº Chasis
              </TableCell>
              <TableCell style={{ fontWeight: "bold", minWidth: 100 }}>
                Servicio
              </TableCell>
              <TableCell style={{ fontWeight: "bold", minWidth: 140 }}>
                Estado
              </TableCell>
              <TableCell style={{ fontWeight: "bold", minWidth: 40 }}>
                Eliminar
              </TableCell>
              <TableCell style={{ fontWeight: "bold", minWidth: 40 }}>
                Editar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicleState.rows.map((row) => (
              <TableRow
                style={{
                  whiteSpace: "nowrap",
                  background: row.isEntregado()
                    ? "#C4C4C4"
                    : row.isEnReparacion()
                    ? "#bfd3d3"
                    : "#ffffff",
                }}
                key={row.id}
                hover
                sx={{
                  "& .MuiTableCell-root": {
                    height: "10px",
                    padding: "2px 14px",
                  },
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.marca}
                </TableCell>
                <TableCell align="left">{row.patente}</TableCell>
                <TableCell align="left">{row.kilometraje}</TableCell>
                <TableCell align="left">{row.nMotor}</TableCell>
                <TableCell align="left">{row.nChasis}</TableCell>
                <TableCell align="left">{row.servicio}</TableCell>
                <TableCell align="left">{row.estado}</TableCell>
                <TableCell
                  style={{
                    cursor: "pointer",
                  }}
                  align="left"
                  onClick={() => {
                    setSelected(row);
                    setOpenDelete(true);
                  }}
                >
                  <DeleteIcon />
                </TableCell>
                <TableCell
                  style={{
                    cursor: "pointer",
                  }}
                  align="left"
                  onClick={() => {
                    handleEditOpen(row);
                  }}
                >
                  <EditIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openDelete && selected && (
        <Dialog
          open={openDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          style={{ padding: 25 }}
        >
          <DialogTitle id="alert-dialog-title">
            {"Eliminar Vehículo"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Estás por eliminar el vehículo: ${selected.marca} ${selected.patente}`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDelete(false);
                setSelected(null);
              }}
              style={{ fontSize: 12 }}
              variant="outlined"
              color="error"
            >
              Cancelar
            </Button>
            <div style={{ width: 5 }} />
            <Button
              onClick={handleDelete}
              style={{ fontSize: 12 }}
              variant="outlined"
              color="primary"
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {openEdit && selected && (
        <Dialog
          open={openEdit}
          aria-labelledby="form-dialog-title"
          style={{ padding: 25 }}
        >
          <DialogTitle id="form-dialog-title">Editar Vehículo</DialogTitle>
          <DialogContent>
            <FormControl
              fullWidth
              sx={{ background: "#ffffff", borderRadius: 1, marginTop: 1 }}
            >
              <InputLabel id="demo-simple-select-label">Marca</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="marca"
                value={selected.marca}
                label="Marca"
                onChange={handleSelectChange}
                MenuProps={MenuProps}
              >
                <MenuItem value={"HONDA"}>HONDA</MenuItem>
                <MenuItem value={"YAMAHA"}>YAMAHA</MenuItem>
                <MenuItem value={"SUZUKI"}>SUZUKI</MenuItem>
                <MenuItem value={"KAWASAKI"}>KAWASAKI</MenuItem>
                <MenuItem value={"BMW"}>BMW</MenuItem>
                <MenuItem value={"KTM"}>KTM</MenuItem>
                <MenuItem value={"DUCATI"}>DUCATI</MenuItem>
                <MenuItem value={"BENELLI"}>BENELLI</MenuItem>
                <MenuItem value={"BAJAJ"}>BAJAJ</MenuItem>
                <MenuItem value={"MOTOMEL"}>MOTOMEL</MenuItem>
                <MenuItem value={"GILERA"}>GILERA</MenuItem>
                <MenuItem value={"ZANELLA"}>ZANELLA</MenuItem>
                <MenuItem value={"CORVEN"}>CORVEN</MenuItem>
                <MenuItem value={"MONDIAL"}>MONDIAL</MenuItem>
                <MenuItem value={"KELLER"}>KELLER</MenuItem>
                <MenuItem value={"GUERRERO"}>GUERRERO</MenuItem>
                <MenuItem value={"ROYAL ENFIELD"}>ROYAL ENFIELD</MenuItem>
                <MenuItem value={"HARLEY-DAVIDSON"}>HARLEY-DAVIDSON</MenuItem>
                <MenuItem value={"BETA"}>BETA</MenuItem>
                <MenuItem value={"JAWA"}>JAWA</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="patente"
              label="Patente"
              value={selected.patente}
              onChange={handleTextFieldChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="kilometraje"
              label="Kilometraje"
              value={selected.kilometraje}
              onChange={handleTextFieldChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="nMotor"
              label="Nº Motor"
              value={selected.nMotor}
              onChange={handleTextFieldChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="nChasis"
              label="Nº Chasis"
              value={selected.nChasis}
              onChange={handleTextFieldChange}
              fullWidth
            />

            <FormControl
              fullWidth
              sx={{ background: "#ffffff", borderRadius: 1, marginTop: 1 }}
            >
              <InputLabel id="demo-simple-select-label">Servicio</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="servicio"
                value={selected.servicio}
                label="Servicio"
                onChange={handleSelectChange}
                MenuProps={MenuProps}
              >
                <MenuItem value={"1 SERVICE"}>1 SERVICE</MenuItem>
                <MenuItem value={"2 SERVICE"}>2 SERVICE</MenuItem>
                <MenuItem value={"3 SERVICE"}>3 SERVICE</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              sx={{ background: "#ffffff", borderRadius: 1, marginTop: 1 }}
            >
              <InputLabel id="demo-simple-select-label">Estado</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="estado"
                value={selected.estado}
                label="Estado"
                onChange={handleSelectChange}
                MenuProps={MenuProps}
              >
                <MenuItem value={"INGRESADO"}>INGRESADO</MenuItem>
                <MenuItem value={"EN REPARACIÓN"}>EN REPARACIÓN</MenuItem>
                <MenuItem value={"ENTREGADO"}>ENTREGADO</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenEdit(false);
                setSelected(null);
                setChanged(false);
              }}
              style={{ fontSize: 12 }}
              variant="outlined"
              color="error"
            >
              Cancelar
            </Button>
            <div style={{ width: 5 }} />
            <Button
              onClick={handleEdit}
              style={{ fontSize: 12 }}
              variant="outlined"
              color="primary"
              disabled={!cahnged}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
