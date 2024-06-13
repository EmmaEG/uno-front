import { CircularProgress } from "@mui/material";
import { TallerFilter } from "./TallerFilter";
import { TallerTable } from "./TallerTable";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../redux/store/Store";
import { IVehicleSliceState } from "../../redux/VehicleSlice/VehicleSlice";

export const TallerPage = () => {
  const vechicleState = useSelector<IApplicationState, IVehicleSliceState>(
    (state) => state.vehicleState
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: 'calc(100vh - 15px)'
      }}
    >
      {vechicleState.loading && (
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
      <h1 style={{ color: "#000000", fontWeight: "bold" }}>
        Servicio Post Venta
      </h1>
      <TallerFilter />
      <div style={{ height: 30 }} />
      <TallerTable />
    </div>
  );
};
