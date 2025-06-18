import { CircularProgress } from "@mui/material";
import { TallerFilter } from "./TallerFilter";
import { TallerTable } from "./TallerTable";
import { useAppDispatch, useAppSelector } from "../../redux/store/Store";
import MessageDialog from "../../components/MessageDialog";
import { setMessage } from "../../redux/VehicleSlice/VehicleSlice";

export const TallerPage = () => {
  const vechicleState = useAppSelector((state) => state.vehicleState);
  const dispatch = useAppDispatch();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "calc(100vh - 15px)",
        width: "100%",
      }}
    >
      {vechicleState.loading && (
        <div
          style={{
            position: "absolute",
            zIndex: 9999,
            height: "100%",
            width: "100vw",
          }}
        >
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
            }}
          >
            <CircularProgress color="inherit" />
          </div>
        </div>
      )}
      {vechicleState.message.length !== 0 && (
        <MessageDialog
          title={"Información Importante"}
          onClose={() => {
            dispatch(setMessage(""));
          }}
          message={vechicleState.message}
        />
      )}
      <div style={{ height: 30 }} />
      <TallerFilter />
      <div style={{ height: 30 }} />
      <TallerTable />
    </div>
  );
};
