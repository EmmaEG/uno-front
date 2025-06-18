import * as React from "react";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";


interface CustomErrorProps {
  ignoreError: () => void;
  sendMailError: (descrip: string) => void;
  openError: boolean;
}

export const CustomError: React.FC<CustomErrorProps> = (props) => {
  const [descripcion, setDescripcion] = React.useState("");

  React.useEffect(() => {
    setDescripcion("");
  }, []);

  return (
    <Dialog
      onClose={() => {
        props.ignoreError();
      }}
      open={props.openError}
    >
      <DialogTitle
        style={{
          color: "#000000",
          fontWeight: 600,
          backgroundColor: '#1976d2'
        }}
      >
        Informe de Error
      </DialogTitle>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <p
          style={{
            fontWeight: 400,
            fontSize: "18px",
            color: "#000000",
            margin: "0px",
          }}
        >
          Ocurrió un error al realizar la operación
        </p>
        <p
          style={{
            color: "#6f6f6f",
            fontSize: "12px",
            height: "26px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Un reporte del error fue generado. El reporte puede ser usado para
          solucionar el problema
        </p>
        <div style={{ height: "15px" }} />
        <TextField
          InputProps={{ disableUnderline: true }}
          value={descripcion}
          multiline
          autoFocus
          minRows={4}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDescripcion(e.target.value);
          }}
        />
        <div style={{ height: "15px" }} />
        <p
          style={{
            color: "#6f6f6f",
            fontSize: "12px",
            height: "26px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Por favor indique los pasos realizados para poder reproducir el error
          y corregirlo. Gracias.
        </p>
        <div style={{ height: "15px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.ignoreError();
            }}
          >
            Ignorar
          </Button>
          <div style={{ width: "15px" }}></div>
          <Button
            variant="contained"
            onClick={() => {
              props.sendMailError(descripcion);
            }}
          >
            Enviar
          </Button>
        </div>
      </div>
    </Dialog>
  );
};