import { CircularProgress } from "@mui/material";
import { TallerFilter } from "./TallerFilter";
import { TallerTable } from "./TallerTable";
import { useAppSelector } from "../../redux/store/Store";

export const TallerPage = () => {
  const vechicleState = useAppSelector((state) => state.vehicleState);

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
      <div style={{ height: 30 }} />
      <TallerFilter />
      <div style={{ height: 30 }} />
      <TallerTable />
    </div>
  );
};
