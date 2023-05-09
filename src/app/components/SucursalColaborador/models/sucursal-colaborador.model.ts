export interface SucursalColaborador{
  sucursalColaborador_Id: number,
  nombreColaborador: string,
  nombreSucursal: string,
  distancia: number
}
export interface addSucursalColaborador{
  nombreColaborador: string,
  nombreSucursal: string,
  distancia: number
}
export interface updateSucursalColaborador{
  sucursalColaborador_Id: number,
  distancia: number
}

export interface deleteSucursalColaborador{
  sucursalColaborador_Id: number
}

export interface nameColaborador{
  colaborador_Id: number,
  primerNombre:string,
  primerApellido:string
}

export interface nameSucursal{
  sucursal_Id: number,
  nombre:string
}
