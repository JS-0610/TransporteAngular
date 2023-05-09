import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addViaje, nameTransportista} from '../models/viaje.model';
import { environment } from 'src/app/enviroment/enviroment';
import { SucursalColaborador } from '../../SucursalColaborador/models/sucursal-colaborador.model';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private http:HttpClient) { }

  addViaje(body:addViaje){
    return this.http.post(environment.Viaje,body,{responseType:'text'});
  }

  getSucursalColaboradores(id:number){
    return this.http.get<SucursalColaborador[]>(environment.SucursalColaborador+"/"+id);
  }

  getNombreTransportistas(){
    return this.http.get<[nameTransportista]>(environment.NombreTransportista);
  }
}
