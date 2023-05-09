export interface addViaje{
  transportista_Id: number,
  sucursal_Id: number,
  viajesDetalle: detalle[]
}

export interface detalle{
  sucursalColaborador_Id: number
}

export interface nameSucursal{
  sucursal_Id: number,
  nombre:string
}

export interface nameTransportista{
  transportista_Id: number,
  primerNombre:string
}
