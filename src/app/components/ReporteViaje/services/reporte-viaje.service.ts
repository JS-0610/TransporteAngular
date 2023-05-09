import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroment/enviroment';
import { DataForReporteViaje, ViajeDetalleReporte, ViajeReporte } from '../models/reporte-viaje.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteViajeService {

  constructor(private http:HttpClient) { }

  getReporteViajes(body:DataForReporteViaje){
    return this.http.get<ViajeReporte[]>(environment.Viaje+"/"+body.transportista_Id+"/"+body.fechaInicio+"/"+body.fechaFinal);
  }

  getReporteDetalle(id:number){
    return this.http.get<ViajeDetalleReporte[]>(environment.ViajeDetalle+"/"+id);
  }
}
