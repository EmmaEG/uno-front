import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  clearFilterState,
  setChasis,
  setEstado,
  setKm,
  setMarca,
  setMotor,
  setPatente,
  setServicio,
} from "../../redux/VehicleSlice/VehicleFilterSlice";
import {
  getAll,
  saveVehicle,
} from "../../redux/VehicleSlice/VehicleThunksActions";
import { useAppDispatch, useAppSelector } from "../../redux/store/Store";
import { renewToken } from "../../redux/userSlice/UserThunksActions";

export const TallerFilter = () => {
  const dispatch = useAppDispatch();

  const filterState = useAppSelector((state) => state.vehicleFilterState);

  const MenuProps = {
    PaperProps: {
      style: {
        width: "auto",
      },
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <FormControl
          fullWidth
          size="small"
          sx={{ background: "#ffffff", borderRadius: 1 }}
        >
          <InputLabel id="demo-simple-select-label">Marca</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterState.marca}
            label="Marca"
            onChange={(e) => dispatch(setMarca(e.target.value))}
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
        <div style={{ width: 15 }} />
        <TextField
          fullWidth
          size="small"
          label="Patente"
          variant="outlined"
          value={filterState.patente}
          sx={{ background: "#ffffff", borderRadius: 1 }}
          onChange={(e) => dispatch(setPatente(e.target.value))}
        />
        <div style={{ width: 15 }} />
        <TextField
          fullWidth
          size="small"
          label="Kilometraje"
          variant="outlined"
          value={filterState.kilometraje}
          onChange={(e) => {
            const input = Number(e.target.value);
            if (!isNaN(input)) {
              dispatch(setKm(input.toString()));
            }
          }}
          sx={{ background: "#ffffff", borderRadius: 1 }}
        />
        <div style={{ width: 15 }} />
        <TextField
          fullWidth
          size="small"
          label="Nº Motor"
          variant="outlined"
          value={filterState.nMotor}
          onChange={(e) => dispatch(setMotor(e.target.value))}
          sx={{ background: "#ffffff", borderRadius: 1 }}
        />
        <div style={{ width: 15 }} />
        <TextField
          fullWidth
          size="small"
          label="Nº Chasis"
          variant="outlined"
          value={filterState.nChasis}
          onChange={(e) => dispatch(setChasis(e.target.value))}
          sx={{ background: "#ffffff", borderRadius: 1 }}
        />
        <div style={{ width: 15 }} />

        <FormControl
          fullWidth
          size="small"
          sx={{ background: "#ffffff", borderRadius: 1 }}
        >
          <InputLabel id="demo-simple-select-label">Servicio</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterState.servicio}
            label="Marca"
            onChange={(e) => dispatch(setServicio(e.target.value))}
            MenuProps={MenuProps}
          >
            <MenuItem value={"1 SERVICE"}>1 SERVICE</MenuItem>
            <MenuItem value={"2 SERVICE"}>2 SERVICE</MenuItem>
            <MenuItem value={"3 SERVICE"}>3 SERVICE</MenuItem>
          </Select>
        </FormControl>
        <div style={{ width: 15 }} />

        <FormControl
          fullWidth
          size="small"
          sx={{ background: "#ffffff", borderRadius: 1 }}
        >
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterState.estado}
            label="Marca"
            onChange={(e) => dispatch(setEstado(e.target.value))}
            MenuProps={MenuProps}
          >
            <MenuItem value={"INGRESADO"}>INGRESADO</MenuItem>
            <MenuItem value={"EN REPARACIÓN"}>EN REPARACIÓN</MenuItem>
            <MenuItem value={"ENTREGADO"}>ENTREGADO</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div
        style={{ display: "flex", marginTop: 10, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          style={{
            width: 120,
            marginLeft: "auto",
            marginRight: 15,
            fontWeight: "bold",
          }}
          color="info"
          onClick={() => {
            dispatch(clearFilterState());
            dispatch(renewToken());
          }}
          disabled={
            filterState.marca?.length === 0 &&
            filterState.servicio?.length === 0 &&
            filterState.estado?.length === 0 &&
            filterState.patente?.length === 0 &&
            filterState.kilometraje?.length === 0 &&
            filterState.nMotor?.length === 0 &&
            filterState.nChasis?.length === 0
          }
        >
          Limpiar
        </Button>
        <Button
          variant="contained"
          style={{ width: 120, fontWeight: "bold" }}
          color="info"
          disabled={
            filterState.marca?.length === 0 ||
            filterState.servicio?.length === 0 ||
            filterState.estado?.length === 0 ||
            filterState.patente?.length === 0 ||
            filterState.kilometraje?.length === 0 ||
            filterState.nMotor?.length === 0 ||
            filterState.nChasis?.length === 0
          }
          onClick={async () => {
            await dispatch(saveVehicle(filterState));
            dispatch(renewToken());
            dispatch(clearFilterState());
            dispatch(getAll());
          }}
        >
          Agregar
        </Button>
      </div>
    </div>
  );
};
