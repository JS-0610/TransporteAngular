export interface Transportista{
    transportista_Id: number,
    primerNombre: string,
    fechaNacimiento: Date,
    telefono: string,
    tarifa: number,
    estado: boolean
}

export interface addTransportista{
  primerNombre: string,
  fechaNacimiento: Date,
  telefono: string,
  tarifa: number
}

export interface updateTransportista{
  transportista_Id: number,
  primerNombre: string,
  fechaNacimiento: Date,
  telefono: string,
  tarifa: number
}

export interface deleteTransportista{
  transportista_Id: number,
}
