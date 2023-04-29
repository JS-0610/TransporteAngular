export interface Colaborador{
  colaborador_Id: number,
  primerNombre: string,
  primerApellido: string,
  dni: string,
  fechaNacimiento: Date,
  direccion: string,
  telefono: string,
  estado: boolean
}

export interface addColaborador{
  primerNombre: string,
  primerApellido: string,
  dni: string,
  fechaNacimiento: Date,
  direccion: string,
  telefono: string
}

export interface updateColaborador{
  colaborador_Id: number,
  primerNombre: string,
  primerApellido: string,
  dni: string,
  fechaNacimiento: Date,
  direccion: string,
  telefono: string
}
