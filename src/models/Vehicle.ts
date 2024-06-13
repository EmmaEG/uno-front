export interface IVehicle {
  readonly id: string;
  readonly marca: string;
  readonly patente: string;
  readonly kilometraje: string;
  readonly nMotor: string;
  readonly nChasis: string;
  readonly servicio: string;
  readonly estado: string;
}

export class Vehicle {
  readonly id: string;
  readonly marca: string;
  readonly patente: string;
  readonly kilometraje: string;
  readonly nMotor: string;
  readonly nChasis: string;
  readonly servicio: string;
  readonly estado: string;

  constructor(args: IVehicle) {
    this.id = args.id;
    this.marca = args.marca;
    this.patente = args.patente;
    this.kilometraje = args.kilometraje;
    this.nMotor = args.nMotor;
    this.nChasis = args.nChasis;
    this.servicio = args.servicio;
    this.estado = args.estado;
  }

  public isEntregado = (): boolean => {
    return this.estado === "ENTREGADO"
  };

  public isEnReparacion = (): boolean => {
    return this.estado === "EN REPARACIÓN"
  };
}
