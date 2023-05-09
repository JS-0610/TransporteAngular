import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/enviroment/enviroment';
import { SucursalColaborador, addSucursalColaborador, deleteSucursalColaborador, nameColaborador, nameSucursal, updateSucursalColaborador } from '../models/sucursal-colaborador.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalColaboradorService {

  constructor(private http:HttpClient) { }

  getSucursalColaboradores(){
    return this.http.get<SucursalColaborador[]>(environment.SucursalColaborador);
  }

  getNombreColaboradores(){
    return this.http.get<nameColaborador[]>(environment.NombreColaboradores);
  }

  getNombreSucursales(){
    return this.http.get<nameSucursal[]>(environment.NombreSucursal);
  }

  addSucursalColaborador(body: addSucursalColaborador){
    return this.http.post(environment.SucursalColaborador,body,{responseType: 'text'});
  }

  updateSucursalColaborador(body:updateSucursalColaborador){
    return this.http.put(environment.SucursalColaborador,body,{responseType:'text'});
  }

  deleteSucursalColaborador(body:deleteSucursalColaborador){
    return this.http.request('delete',environment.SucursalColaborador,{body:body,responseType:'text'});
  }

  reload$ = new BehaviorSubject<boolean>(false);

  SucursalColaboradorVacio: updateSucursalColaborador = {
    sucursalColaborador_Id: 0,
    distancia: 0
  };

  openEditModal$ = new BehaviorSubject<updateSucursalColaborador>(this.SucursalColaboradorVacio);

}
