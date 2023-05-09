export interface ViajeReporte{
  viaje_Id: number,
  nombreTransportista: string,
  fecha:Date,
  tarifaTransportista: number,
  distanciaRecorrida: number,
  pagoTransportista: number
}

export interface ViajeDetalleReporte{
  viajeDetalle_Id: number,
  nombreColaborador: string,
  distanciaRecorrida: number,
  pago: number
}

export interface DataForReporteViaje{
  transportista_Id:number,
  fechaInicio:Date,
  fechaFinal:Date
}
