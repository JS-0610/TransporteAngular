export interface Sucursal{
  sucursal_Id: number,
  nombre: string,
  direccion: string,
  estado: boolean
}

export interface addSucursal{
  nombre: string,
  direccion: string,
}

export interface updateSucursal{
  sucursal_Id: number,
  nombre: string,
  direccion: string
}

export interface deleteSucursal{
  sucursal_Id:number
}
